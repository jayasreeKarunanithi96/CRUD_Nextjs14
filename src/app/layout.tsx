import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/services/redux/provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRUD Table APP",
  description: "CRUD Table APP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <body className={inter.className}>
        <Providers>{children}</Providers>
        </body>
      
    </html>
  );
}
