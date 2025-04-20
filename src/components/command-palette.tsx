import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const items = [
    { id: 1, title: "Dashboard", description: "View main dashboard", shortcut: "D" },
    { id: 2, title: "Samples", description: "View all samples", shortcut: "S" },
    { id: 3, title: "Patients", description: "Manage patients", shortcut: "P" },
    { id: 4, title: "Settings", description: "Open settings", shortcut: "," },
    { id: 5, title: "Theme", description: "Toggle dark mode", shortcut: "T" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Command Palette</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              role="button"
              tabIndex={0}
            >
              <div className="flex flex-col">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-muted-foreground">
                  {item.description}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {item.shortcut}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
