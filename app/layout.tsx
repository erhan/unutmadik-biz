import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Unutmadık.biz - Bizi Unutanlar İçin Hatırlatıyoruz",
    template: "%s - Unutmadık.biz",
  },
  description:
    "Yaşanan acıları unutmamak, gelecekte benzer trajedilerin yaşanmaması için hatırlatmaya devam ediyoruz. Son 25 yılın önemli toplumsal olayları.",
  keywords: "unutmadık, trajik olaylar, hatırlama, tarih, toplumsal olaylar, deprem, terör, afet",
  authors: [{ name: "Unutmadık.biz" }],
  creator: "Unutmadık.biz",
  publisher: "Unutmadık.biz",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://unutmadik.biz",
    title: "Unutmadık.biz - Bizi Unutanlar İçin Hatırlatıyoruz",
    description:
      "Yaşanan acıları unutmamak, gelecekte benzer trajedilerin yaşanmaması için hatırlatmaya devam ediyoruz.",
    siteName: "Unutmadık.biz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unutmadık.biz - Bizi Unutanlar İçin Hatırlatıyoruz",
    description:
      "Yaşanan acıları unutmamak, gelecekte benzer trajedilerin yaşanmaması için hatırlatmaya devam ediyoruz.",
    site: "@unutmadikbiz",
    creator: "@unutmadikbiz",
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://unutmadik.biz",
  },
  generator: "Next.js",
  applicationName: "Unutmadık.biz",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} bg-slate-900 text-white antialiased`}>{children}</body>
    </html>
  )
}
