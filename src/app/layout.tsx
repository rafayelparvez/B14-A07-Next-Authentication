import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const getHindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "আজকের বাজারের অবস্থা",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${getHindSiliguri.className} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
