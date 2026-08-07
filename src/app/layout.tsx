import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Mohammed Yahya — AI Engineer & Systems Architect",
    template: "%s · Mohammed Yahya",
  },
  description:
    "AI Engineer & Systems Architect. Architecting agentic intelligence and scalable ML pipelines — multi-agent systems, RAG & knowledge graphs, and predictive models.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Multi-Agent Systems",
    "RAG",
    "Knowledge Graphs",
    "Mumbai",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: "Mohammed Yahya — AI Engineer & Systems Architect",
    description:
      "Architecting agentic intelligence and scalable ML pipelines for real-world impact.",
    url: site.domain,
    siteName: site.brand,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Yahya — AI Engineer & Systems Architect",
    description:
      "Architecting agentic intelligence and scalable ML pipelines for real-world impact.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem("yahya-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var e=document.documentElement;if(d)e.classList.add("dark");e.style.colorScheme=d?"dark":"light";}catch(_){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased" suppressHydrationWarning>
        <Script
          id="yahya-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
