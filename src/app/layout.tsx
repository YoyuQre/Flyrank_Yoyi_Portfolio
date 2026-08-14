import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { AssistantBubble } from "@/features/assistant-bubble";
import { ClarityAnalytics } from "@/components/clarity-analytics";
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
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Mohammed Yahya Qureshi | AI/ML Engineer",
    template: "%s | Mohammed Yahya Qureshi",
  },
  description:
    "AI/ML Engineer building agentic AI, RAG systems, and predictive ML models — Machine Learning, Generative AI, Agentic AI, and Cybersecurity.",
  keywords: [
    "AI/ML Engineer",
    "Machine Learning",
    "Generative AI",
    "Agentic AI",
    "RAG",
    "Multi-Agent Systems",
    "Cybersecurity",
    "Mumbai",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: "Mohammed Yahya Qureshi | AI/ML Engineer",
    description:
      "AI/ML Engineer specializing in Machine Learning, Generative AI, Agentic AI, and RAG.",
    url: site.domain,
    siteName: site.brand,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Yahya Qureshi | AI/ML Engineer",
    description:
      "AI/ML Engineer specializing in Machine Learning, Generative AI, Agentic AI, and RAG.",
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
        <AssistantBubble />
        <ClarityAnalytics />
      </body>
    </html>
  );
}
