import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const groups = [
  {
    label: "Personal Account",
    teams: [
      {
        label: "Alicia Koch",
        value: "personal",
      },
    ],
  },
  {
    label: "Teams",
    teams: [
      {
        label: "Acme Inc.",
        value: "acme-inc",
      },
      {
        label: "Monsters Inc.",
        value: "monsters",
      },
    ],
  },
]

interface TeamSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const selectedTeam = groups[0].teams[0]

  return (
    <div className={cn("flex items-center", className)}>
      <Button variant="outline" className="w-[200px] justify-between">
        <span>{selectedTeam.label}</span>
        <span className="ml-auto opacity-50">▼</span>
      </Button>
    </div>
  )
}
