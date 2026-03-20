import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MAISON. – Thời Trang Cao Cấp',
  description: 'Khám phá BST mới nhất – Phong cách sống tinh tế',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
