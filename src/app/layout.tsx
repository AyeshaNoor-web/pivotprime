import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pivot Prime - Unlock Your Prime",
  description: "Strategic clarity, hands-on execution, and practical support for growing businesses ready to scale, streamline operations, and achieve sustainable results.",
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans antialiased h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground relative">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
