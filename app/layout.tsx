import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "../styles/globals.css";

// Load Google Fonts as before
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const myCustomFont = localFont({
  src: "../fonts/Impact.ttf",
  variable: "--font-my-custom-font",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skip Hire Booking",
  description: "Book your skip quickly and easily.",
  icons: {
    icon: '/images/skip.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${myCustomFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}