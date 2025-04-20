import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Filter } from "lucide-react"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { samples } from "@/lib/data"
import type { Sample } from "@/lib/data"

const statuses = ["blocked", "in progress", "done"] as const
type Status = (typeof statuses)[number]

// Column widths in pixels
const COLUMNS = [
  { width: "w-[100px]", label: "Status" },
  { width: "w-[100px]", label: "Sample ID" },
  { width: "w-[180px]", label: "Creation Date" },
  { width: "w-[200px]", label: "Hypothesis" },
  { width: "w-[120px]", label: "Tissue Type" },
  { width: "w-[120px]", label: "Sample Source" },
  { width: "w-[200px]", label: "Patient Name" },
  { width: "w-[100px]", label: "Patient ID" },
  { width: "w-[100px]", label: "Actions" },
] as const

export function SamplesTable() {
  const navigate = useNavigate()
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([...statuses])
  const [date, setDate] = useState<string>()
  const [patientSearch, setPatientSearch] = useState("")

  const filteredSamples = samples.filter(sample => {
    const matchesStatus = selectedStatuses.includes(sample.status)
    const matchesDate = !date || sample.creationDate === date
    const matchesPatient = !patientSearch || 
      sample.patientName.toLowerCase().includes(patientSearch.toLowerCase()) ||
      sample.patientId.toLowerCase().includes(patientSearch.toLowerCase())
    
    return matchesStatus && matchesDate && matchesPatient
  })

  return (
    <div className="space-y-8">
      <div className="grid gap-8" style={{ gridTemplateColumns: "100px 130px 210px 250px 170px 100px 200px 100px 100px" }}>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[150px]">
              {statuses.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={selectedStatuses.includes(status)}
                  onCheckedChange={(checked) => {
                    setSelectedStatuses(
                      checked
                        ? [...selectedStatuses, status]
                        : selectedStatuses.filter(s => s !== status)
                    )
                  }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div></div>
        <div>
          <DatePicker
            value={date}
            onChange={setDate}
            className="w-full"
            placeholder="Pick a date"
          />
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div>
          <Input
            placeholder="Search patient..."
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
            className="h-9"
          />
        </div>
        <div></div>
        <div></div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {COLUMNS.map((col, i) => (
                <TableHead key={i} className={col.width}>{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSamples.map((sample) => (
              <TableRow key={sample.id}>
                <TableCell className={COLUMNS[0].width}>
                  <Badge 
                    variant={
                      sample.status === "done" 
                        ? "default"
                        : sample.status === "in progress"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {sample.status}
                  </Badge>
                </TableCell>
                <TableCell className={cn("font-medium", COLUMNS[1].width)}>{sample.id}</TableCell>
                <TableCell className={COLUMNS[2].width}>{sample.creationDate}</TableCell>
                <TableCell className={COLUMNS[3].width}>{sample.hypothesis}</TableCell>
                <TableCell className={COLUMNS[4].width}>{sample.tissueType}</TableCell>
                <TableCell className={COLUMNS[5].width}>{sample.sampleSource}</TableCell>
                <TableCell className={COLUMNS[6].width}>{sample.patientName}</TableCell>
                <TableCell className={COLUMNS[7].width}>{sample.patientId}</TableCell>
                <TableCell className={COLUMNS[8].width}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() => navigate(`/sample/${sample.id}`)}
                  >
                    Open
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {(date || patientSearch) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setDate(undefined)
            setPatientSearch("")
          }}
        >
          Reset filters
        </Button>
      )}
    </div>
  )
}
