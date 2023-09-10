'use client'

import { ReactNode } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { getCssText } from '@ignite-ui/react'
import { globalStyles } from './global'

interface ServerStylesheetProps {
  children: ReactNode
}

globalStyles() // avoid unnecessary rendering

export function ServerStylesheet({ children }: ServerStylesheetProps) {
  useServerInsertedHTML(() => {
    if (typeof window === 'undefined') {
      return (
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      )
    }
  })

  return <>{children}</>
}
