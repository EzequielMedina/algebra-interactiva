import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Álgebra Interactiva",
  description:
    "Plataforma educativa de Álgebra para nivel secundario avanzado. Conjuntos, Lógica, Matrices y Sistemas de ecuaciones.",
  openGraph: {
    title: "Álgebra Interactiva",
    description: "Aprendé Álgebra de forma interactiva y autónoma.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-neutral-200 py-6 text-center text-sm text-neutral-500">
          Álgebra Interactiva · Material para uso educativo
        </footer>
      </body>
    </html>
  );
}
