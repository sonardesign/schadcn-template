import { ToastProvider as RadixToastProvider } from "@radix-ui/react-toast"
import { ReactNode } from "react"

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <RadixToastProvider>
      {children}
    </RadixToastProvider>
  )
}
