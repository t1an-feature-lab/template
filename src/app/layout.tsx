import type {Metadata} from 'next'
import type {ReactNode} from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: '项目模板',
  description: 'Next.js 项目模板',
}

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
