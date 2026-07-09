import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const siteUrl = 'https://rohan-jose-08.github.io'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Rohan Jose — Software Engineer · Systems Programmer · AI Builder',
    template: '%s — Rohan Jose',
  },
  description:
    'Portfolio of Rohan Jose: systems programming, GPU rendering, OS development, AI tooling, and full-stack engineering. Built from live GitHub telemetry.',
  keywords: [
    'Rohan Jose',
    'software engineer',
    'systems programmer',
    'GPU rendering',
    'Vulkan',
    'OS development',
    'AI engineer',
    'portfolio',
  ],
  authors: [{ name: 'Rohan Jose', url: 'https://github.com/Rohan-Jose-08' }],
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Rohan Jose — Software Engineer · Systems Programmer · AI Builder',
    description:
      'Systems programming, GPU rendering, OS development, AI tooling, and full-stack engineering — driven by live GitHub telemetry.',
    siteName: 'Rohan Jose',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rohan Jose — Software Engineer · Systems Programmer · AI Builder',
    description:
      'Systems programming, GPU rendering, OS development, AI tooling, and full-stack engineering.',
  },
  robots: { index: true, follow: true },
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#12151f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background dark ${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
