import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const geologica = Geologica({
  subsets: ["latin"],
  variable: "--font-geologica",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ADHD Test",
  description: "ADHD assessment and personalized report",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geologica.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col flex-1 text-default-black">
        <Header />
        {children}
      </body>
    </html>
  );
}
