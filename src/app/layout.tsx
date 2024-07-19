import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shramasa",
  description:
    "Shramasa is an organic mom's beauty brand that offers a wide range of natural beauty products for all the hard-working mothers out there.",
  keywords: ["organic", "beauty", "mom", "natural", "products", "shramasa"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
