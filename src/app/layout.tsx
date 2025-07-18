import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

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
    <html lang="pt-br">
      <body className={'antialiased flex flex-col min-h-screen overflow-x-hidden bg-gray-100'}>
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
