import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ServerStylesheet } from '@/styles/ServerStylesheet'
import { NextAuthProvider } from '@/contexts/NextAuthProvider'

export const metadata: Metadata = {
  title: 'Ignite Call',
  description:
    'Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.',
}

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <NextAuthProvider>
          <ServerStylesheet>{children}</ServerStylesheet>
        </NextAuthProvider>
      </body>
    </html>
  )
}
