import { cn } from "@/lib/utils"
import { Home, Users, User, Building2, PanelLeftClose, PanelLeft, Pencil } from "lucide-react"
import { UserNav } from "./user-nav"
import { useState } from "react"
import { Button } from "./ui/button"

export function MainNav({
  className,
  onCollapse,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  onCollapse?: (collapsed: boolean) => void
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    onCollapse?.(newState)
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 flex h-screen flex-col border-r bg-white transition-all duration-300",
        isCollapsed ? "w-[88px] px-4" : "w-64 px-6",
        className
      )}
      {...props}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 z-10 rounded-full bg-background shadow-md"
        onClick={toggleCollapse}
      >
        {isCollapsed ? (
          <PanelLeft className="h-5 w-5" />
        ) : (
          <PanelLeftClose className="h-5 w-5" />
        )}
      </Button>
      <div className="py-4">
        <h2 className={cn(
          "text-lg font-semibold transition-all duration-300",
          isCollapsed && "hidden"
        )}>
          Dashboard
        </h2>
      </div>
      <div className="flex-1 space-y-1">
        <a
          href="/"
          className={cn(
            "group flex items-center rounded-md font-medium hover:bg-accent hover:text-accent-foreground",
            isCollapsed ? "h-10 w-10 justify-center" : "h-10 px-3",
            "transition-all duration-300"
          )}
        >
          <div className={cn(
            "flex items-center justify-center",
            isCollapsed ? "h-10 w-10" : "h-10 w-10"
          )}>
            <Home className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className={cn("text-sm transition-all duration-300 ml-3", isCollapsed && "hidden")}>
            Home
          </span>
        </a>
        <a
          href="/projects"
          className={cn(
            "group flex items-center rounded-md text-muted-foreground font-medium hover:bg-accent hover:text-accent-foreground",
            isCollapsed ? "h-10 w-10 justify-center" : "h-10 px-3",
            "transition-all duration-300"
          )}
        >
          <div className={cn(
            "flex items-center justify-center",
            isCollapsed ? "h-10 w-10" : "h-10 w-10"
          )}>
            <Building2 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className={cn("text-sm transition-all duration-300 ml-3", isCollapsed && "hidden")}>
            Projects
          </span>
        </a>
        <a
          href="/patients"
          className={cn(
            "group flex items-center rounded-md text-muted-foreground font-medium hover:bg-accent hover:text-accent-foreground",
            isCollapsed ? "h-10 w-10 justify-center" : "h-10 px-3",
            "transition-all duration-300"
          )}
        >
          <div className={cn(
            "flex items-center justify-center",
            isCollapsed ? "h-10 w-10" : "h-10 w-10"
          )}>
            <Users className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className={cn("text-sm transition-all duration-300 ml-3", isCollapsed && "hidden")}>
            Patients
          </span>
        </a>
        <a
          href="/physicians"
          className={cn(
            "group flex items-center rounded-md text-muted-foreground font-medium hover:bg-accent hover:text-accent-foreground",
            isCollapsed ? "h-10 w-10 justify-center" : "h-10 px-3",
            "transition-all duration-300"
          )}
        >
          <div className={cn(
            "flex items-center justify-center",
            isCollapsed ? "h-10 w-10" : "h-10 w-10"
          )}>
            <User className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className={cn("text-sm transition-all duration-300 ml-3", isCollapsed && "hidden")}>
            Physicians
          </span>
        </a>
        <a
          href="/whiteboard"
          className={cn(
            "group flex items-center rounded-md text-muted-foreground font-medium hover:bg-accent hover:text-accent-foreground",
            isCollapsed ? "h-10 w-10 justify-center" : "h-10 px-3",
            "transition-all duration-300"
          )}
        >
          <div className={cn(
            "flex items-center justify-center",
            isCollapsed ? "h-10 w-10" : "h-10 w-10"
          )}>
            <Pencil className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className={cn("text-sm transition-all duration-300 ml-3", isCollapsed && "hidden")}>
            Whiteboard
          </span>
        </a>
      </div>
      <div className="py-4">
        <UserNav isCollapsed={isCollapsed} />
      </div>
    </nav>
  )
}
