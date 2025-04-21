import { TopNav } from "@/components/top-nav"
import { Outlet } from "react-router-dom"

export function Layout() {
  return (
    <div className="min-h-screen bg-[#f4f4f5]">
      <TopNav />
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  )
}
