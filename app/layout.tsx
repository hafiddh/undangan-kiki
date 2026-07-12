import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Great_Vibes,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { wedding } from "@/data/wedding";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `The Wedding of ${wedding.bride.nickname} & ${wedding.groom.nickname}`,
  description: `Undangan pernikahan ${wedding.bride.nickname} & ${wedding.groom.nickname} — ${wedding.dateLong}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${script.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
