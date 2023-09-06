'use client'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { globalStyles } from '@/styles/global'
import { getCssText } from '@ignite-ui/react'

export const metadata: Metadata = {
  title: 'Ignite Call',
  description:
    'Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.',
}

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

globalStyles()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* for loading styles with javascript disabled */}
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </head>
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
