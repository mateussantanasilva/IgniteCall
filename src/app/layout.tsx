import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ServerStylesheet } from '@/styles/ServerStylesheet'
import { NextAuthProvider } from '@/contexts/NextAuthProvider'
import { ReactQueryProvider } from '@/contexts/ReactQueryProvider'
import { UsernameParamProvider } from '@/contexts/UsernameParamProvider'

export const metadata: Metadata = {
  title: {
    default: 'Descomplique sua agenda | Ignite Call',
    template: '%s | Ignite Call', // applies less to the home
  },
  description:
    'Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.',
  keywords: ['Google', 'Agendamento', 'Calendário', 'Ignite'],
  authors: [
    {
      name: 'Mateus Santana',
      url: 'https://github.com/mateussantanasilva',
    },
  ],
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
