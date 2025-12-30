let tokenCache: { token: string; expiry: number } | null = null;

export async function getShiprocketToken() {
  if (tokenCache && Date.now() < tokenCache.expiry) {
    return tokenCache.token;
  }

  const res = await fetch(
    "https://apiv2.shiprocket.in/v1/external/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }),
    }
  );

  const data = await res.json();

  tokenCache = {
    token: data.token,
    expiry: Date.now() + 7 * 24 * 60 * 60 * 1000, // ~7 days
  };

  return tokenCache.token;
}
