import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from './contexts/CartContext'
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Salpatos",
  description: "Loja de calçados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>

      <html lang="pt-br">
        <body
          className={'antialiased'}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </html >
    </CartProvider>
  );
}
