import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct, createStorefrontCheckout } from '@/lib/shopify';

/* ---------------- TYPES ---------------- */

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

type PaymentMode = 'PREPAID' | 'COD';

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isOpen: boolean;
  paymentMode: PaymentMode;

  /* Cart actions */
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;

  /* UI & state */
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  setOpen: (open: boolean) => void;
  setPaymentMode: (mode: PaymentMode) => void;

  /* Checkout */
  createCheckout: () => Promise<void>;
  createShiprocketCheckout: () => Promise<void>;
}

/* ---------------- STORE ---------------- */

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isOpen: false,
      paymentMode: 'PREPAID',

      /* ---------- CART LOGIC ---------- */

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);

        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, item] });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          ),
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId),
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      /* ---------- STATE ---------- */

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),
      setOpen: (isOpen) => set({ isOpen }),
      setPaymentMode: (paymentMode) => set({ paymentMode }),

      /* ---------- SHOPIFY CHECKOUT (PREPAID) ---------- */

      createCheckout: async () => {
        const { items, setLoading, setCheckoutUrl } = get();
        if (items.length === 0) return;

        setLoading(true);
        try {
          const checkoutUrl = await createStorefrontCheckout(
            items.map(item => ({
              variantId: item.variantId,
              quantity: item.quantity,
            }))
          );
          setCheckoutUrl(checkoutUrl);
          window.location.href = checkoutUrl;
        } catch (error) {
          console.error('Failed to create Shopify checkout:', error);
          throw error;
        } finally {
          setLoading(false);
        }
      },

      /* ---------- SHIPROCKET CHECKOUT (COD) ---------- */

      createShiprocketCheckout: async () => {
        const { items, setLoading } = get();
        if (items.length === 0) return;

        setLoading(true);
        try {
          const res = await fetch('/api/shiprocket/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items: items.map(item => ({
                name: item.product.title,
                sku: item.variantId,
                selling_price: item.price.amount,
                quantity: item.quantity,
              })),
            }),
          });

          const data = await res.json();

          if (!data.checkoutUrl) {
            throw new Error('Shiprocket checkout failed');
          }

          window.location.href = data.checkoutUrl;
        } catch (error) {
          console.error('Failed to create Shiprocket checkout:', error);
          alert('Cash on Delivery checkout failed. Please try again.');
        } finally {
          setLoading(false);
        }
      },
    }),
    {
      name: 'applix-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        paymentMode: state.paymentMode,
      }),
    }
  )
);
