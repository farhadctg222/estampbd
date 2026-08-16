import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import CartProvider from "./context/CartContext";
import SplashScreen from "./componets/SplashScreen";

export const metadata: Metadata = {
  title: "eStampBD.com - Stamp, Court Fee & Legal Services",
  description:
    "eStampBD.com provides non-judicial stamps, court fees, revenue stamps, stamp papers, legal documentation, income tax return assistance and related services.",
  keywords: [
    "eStampBD",
    "eStampBD.com",
    "Non Judicial Stamp",
    "Court Fee",
    "Revenue Stamp",
    "Stamp Paper",
    "Income Tax Return",
    "Legal Documentation",
    "Bangladesh",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="bg-gray-50 text-gray-800">

        <CartProvider>
          <SplashScreen>
            <Navbar />

            <main className="pt-16">
              {children}
            </main>

          </SplashScreen>
        </CartProvider>

        <Footer />

      </body>
    </html>
  );
}