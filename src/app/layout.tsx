import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from './contexts/CartContext'


export const metadata: Metadata = {
  title: "Modique",
  description: "Loja que vende coisas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>

      <html lang="en">
        <body
          className={'antialiased'}
        >
          {children}
        </body>
      </html >
    </CartProvider>
  );
}
