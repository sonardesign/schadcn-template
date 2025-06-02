import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Patients", href: "/patients" },
  { label: "Whiteboard", href: "/whiteboard" },
  { label: "Settings", href: "/settings" },
]

export function TopNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex h-16 items-center border-b bg-white px-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center space-x-8">
        <a href="/" className="flex items-center space-x-2">
          <h1 className="text-lg font-bold">MIRA Prototype</h1>
        </a>
        <div className="flex items-center space-x-6">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search samples..."
            className="pl-8"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <span className="sr-only">Help</span>
          <span className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">?</span>
        </Button>
      </div>
    </nav>
  )
}
