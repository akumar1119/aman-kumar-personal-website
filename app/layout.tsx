import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aman Kumar | B2B SaaS Sales | AI-Powered Pipeline | Toronto",
  description:
    "Aman Kumar — Account Development Executive at OpenText. $6M pipeline, 170% SQL attainment, full-cycle B2B SaaS sales. Targeting AE roles in Toronto and remote.",
  keywords: [
    "Aman Kumar",
    "B2B Sales Toronto",
    "Account Executive",
    "EDI Sales",
    "OpenText",
    "SaaS Sales Canada",
    "AI in Sales",
  ],
  openGraph: {
    title: "Aman Kumar | B2B SaaS Sales",
    description:
      "$6M pipeline. 170.4% SQL attainment. Full-cycle B2B SaaS sales. Targeting AE roles.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Kumar | B2B SaaS Sales",
    description:
      "$6M pipeline. 170.4% SQL attainment. Full-cycle B2B SaaS sales. Targeting AE roles.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
