import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/components/cart-provider";

export const metadata: Metadata = {
  title: "OVERSEAS — Abrokyire Aba Ghana",
  description: "Global influence. Ghanaian identity. Local expression.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <SiteHeader />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
