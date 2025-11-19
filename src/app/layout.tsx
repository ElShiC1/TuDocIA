
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthTemplate } from "@/components/template/AuthTemplate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TuDocAI – Trivias personalizables con IA",
  description: "TuDocAI es una plataforma de IA que genera trivias personalizadas, gestiona tus datos de manera eficiente y te permite mantener tu propia base de datos indexada.",
  icons: {
    icon: [
      { url: "/favicon-light.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.ico", media: "(prefers-color-scheme: dark)" }
    ]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} w-screen h-screen`}>
        <AuthTemplate>
          {children}
        </AuthTemplate>
      </body>
    </html >
  );
}
