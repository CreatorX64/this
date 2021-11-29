const dev = process.env.NODE_ENV !== "production";

export const rootUrl = dev
  ? "http://localhost:3000"
  : "https://yourwebsite.com";
