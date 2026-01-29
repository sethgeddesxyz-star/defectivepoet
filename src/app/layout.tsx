import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Defective Poet - In Memory of Christian Zachary Geddes",
    template: "%s | Defective Poet",
  },
  description:
    "A memorial site honoring the life and work of Christian Zachary Geddes (1974-2004). Free music downloads and poetry.",
  openGraph: {
    title: "Defective Poet - In Memory of Christian Zachary Geddes",
    description:
      "Free music downloads and poetry by Zach Geddes. A memorial site to honor the life of Zach, sharing his life work.",
    images: ["/images/photo.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 page-vignette">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
