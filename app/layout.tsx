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
  other: {
    "theme-color": "#080b14",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Cal Sans — distinctive display font via CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/@fontsource/cal-sans@5.0.1/index.css"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#080b14" />
        {/* Flash-prevention: set data-theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('aman-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);if(t==='light'){var m=document.querySelector('meta[name="theme-color"]');if(m)m.content='#f8fafc'}}else if(window.matchMedia('(prefers-color-scheme:light)').matches){document.documentElement.setAttribute('data-theme','light');var m=document.querySelector('meta[name="theme-color"]');if(m)m.content='#f8fafc'}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
