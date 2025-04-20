import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { CommandPalette } from "./command-palette"

export function Search() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search..."
          className="md:w-[200px] lg:w-[300px]"
          onClick={() => setOpen(true)}
        />
        <kbd className="pointer-events-none absolute right-3 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  )
}
