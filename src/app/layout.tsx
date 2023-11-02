import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ServerStylesheet } from '@/styles/ServerStylesheet'
import { NextAuthProvider } from '@/contexts/NextAuthProvider'
import { ReactQueryProvider } from '@/contexts/ReactQueryProvider'
import { UsernameParamProvider } from '@/contexts/UsernameParamProvider'

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
          <ReactQueryProvider>
            <UsernameParamProvider>
              <ServerStylesheet>{children}</ServerStylesheet>
            </UsernameParamProvider>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
