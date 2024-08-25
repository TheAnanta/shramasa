import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { AuthContextProvider } from "./context/AuthContext";

const manrope = Manrope({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Shramasa",
//   description:
//     "Shramasa is an organic mom's beauty brand that offers a wide range of natural beauty products for all the hard-working mothers out there.",
//   keywords: ["organic", "beauty", "mom", "natural", "products", "shramasa"],
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${manrope.className} dark:bg-slate-950 dark:text-white`}
      >
        <AuthContextProvider>
          <>
            <Navbar />
            {children}
            <Footer />
          </>
        </AuthContextProvider>
      </body>
    </html>
  );
}
