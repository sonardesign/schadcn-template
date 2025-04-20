"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes"

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const useTheme = () => {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useNextTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return {
    theme,
    setTheme,
    mounted
  }
}
