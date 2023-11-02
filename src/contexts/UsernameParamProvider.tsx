'use client'

import { ReactNode, useState } from 'react'
import { createContext } from 'use-context-selector'

interface UsernameParamProviderProps {
  children: ReactNode
}

interface UsernameParamType {
  usernameParam: null | string
  onSetUsernameParam: (username: string) => void
}

export const UsernameParamContext = createContext({} as UsernameParamType)

export function UsernameParamProvider({
  children,
}: UsernameParamProviderProps) {
  const [usernameParam, setUsernameParam] = useState<null | string>(null)

  function onSetUsernameParam(username: string) {
    setUsernameParam(username)
  }

  return (
    <UsernameParamContext.Provider
      value={{ usernameParam, onSetUsernameParam }}
    >
      {children}
    </UsernameParamContext.Provider>
  )
}
