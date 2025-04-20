import { Search } from "@/components/search"
import { MainNav } from "@/components/main-nav"
import TeamSwitcher from "@/components/team-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { Outlet } from "react-router-dom"
import { useState } from "react"

export function Layout() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <MainNav onCollapse={setIsNavCollapsed} />
      <div className={`flex-1 transition-all duration-300 ${isNavCollapsed ? "ml-[88px]" : "ml-64"}`}>
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ThemeToggle />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
