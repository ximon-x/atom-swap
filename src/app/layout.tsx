import { Toaster } from "@/components/ui/toaster";
import AlgorandProvider from "@/lib/hooks/providers/algorand-provider";
import { ThemeProvider } from "@/lib/hooks/providers/theme-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const geistSans = localFont({
  src: "../lib/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../lib/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Atom Swap",
  description: "Pera Wallet Challenge by Simon Samuel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AlgorandProvider>{children}</AlgorandProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
