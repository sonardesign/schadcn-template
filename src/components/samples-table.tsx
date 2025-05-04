import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, ChevronDown } from "lucide-react"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { samples } from "@/lib/data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const statuses = ["blocked", "in progress", "done"] as const
type Status = (typeof statuses)[number]

// Column widths in pixels
const COLUMNS = [
  { width: "w-[100px]", label: "Status" },
  { width: "w-[100px]", label: "Sample ID" },
  { width: "w-[180px]", label: "Creation Date" },
  { width: "w-[200px]", label: "Clinical Diagnosis" },
  { width: "w-[120px]", label: "Tissue Type" },
  { width: "w-[120px]", label: "Sample Source" },
  { width: "w-[200px]", label: "Patient Name" },
  { width: "w-[100px]", label: "Patient ID" },
  { width: "w-[150px]", label: "Date of Birth" },
  { width: "w-[200px]", label: "Actions" },
] as const

export function SamplesTable() {
  // Filter states
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all")
  const [sampleIdFilter, setSampleIdFilter] = useState("")
  const [creationDateFilter, setCreationDateFilter] = useState<string>()
  const [diagnosisFilter, setDiagnosisFilter] = useState("")
  const [tissueTypeFilter, setTissueTypeFilter] = useState("")
  const [sampleSourceFilter, setSampleSourceFilter] = useState("")
  const [patientNameFilter, setPatientNameFilter] = useState("")
  const [patientIdFilter, setPatientIdFilter] = useState("")
  const [dobFilter, setDobFilter] = useState<string>()

  // Get unique values for comboboxes
  const uniqueDiagnoses = Array.from(new Set(samples.map(s => s.clinicalDiagnosis)))
  const uniqueTissueTypes = Array.from(new Set(samples.map(s => s.tissueType)))
  const uniqueSampleSources = Array.from(new Set(samples.map(s => s.sampleSource)))

  // Popover open state for comboboxes
  const [openDiagnosis, setOpenDiagnosis] = useState(false)
  const [openTissueType, setOpenTissueType] = useState(false)
  const [openSampleSource, setOpenSampleSource] = useState(false)

  const filteredSamples = samples.filter(sample => {
    const matchesStatus = statusFilter === "all" || sample.status === statusFilter
    const matchesSampleId = !sampleIdFilter || sample.id.toLowerCase().includes(sampleIdFilter.toLowerCase())
    const matchesCreationDate = !creationDateFilter || sample.creationDate === creationDateFilter
    const matchesDiagnosis = !diagnosisFilter || sample.clinicalDiagnosis.toLowerCase().includes(diagnosisFilter.toLowerCase())
    const matchesTissueType = !tissueTypeFilter || sample.tissueType.toLowerCase().includes(tissueTypeFilter.toLowerCase())
    const matchesSampleSource = !sampleSourceFilter || sample.sampleSource.toLowerCase().includes(sampleSourceFilter.toLowerCase())
    const matchesPatientName = !patientNameFilter || sample.patientName.toLowerCase().includes(patientNameFilter.toLowerCase())
    const matchesPatientId = !patientIdFilter || sample.patientId.toLowerCase().includes(patientIdFilter.toLowerCase())
    const matchesDob = !dobFilter || sample.dateOfBirth === dobFilter
    
    return matchesStatus && matchesSampleId && matchesCreationDate && matchesDiagnosis && 
           matchesTissueType && matchesSampleSource && matchesPatientName && matchesPatientId && matchesDob
  })

  // Reset all filters function
  const resetAllFilters = () => {
    setStatusFilter("all")
    setSampleIdFilter("")
    setCreationDateFilter(undefined)
    setDiagnosisFilter("")
    setTissueTypeFilter("")
    setSampleSourceFilter("")
    setPatientNameFilter("")
    setPatientIdFilter("")
    setDobFilter(undefined)
  }

  return (
    <div className="space-y-8">
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {COLUMNS.map((col, i) => (
                <TableHead key={i} className={col.width}>{col.label}</TableHead>
              ))}
            </TableRow>
            <TableRow className="bg-slate-50">
              {/* Status filter */}
              <TableCell className={COLUMNS[0].width}>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as Status | "all")}
                >
                  <SelectTrigger className="h-8 w-full">
                    <SelectValue placeholder="Filter..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>

              {/* Sample ID filter */}
              <TableCell className={COLUMNS[1].width}>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    placeholder="Search..."
                    value={sampleIdFilter}
                    onChange={(e) => setSampleIdFilter(e.target.value)}
                    className="h-8 pl-7"
                  />
                </div>
              </TableCell>

              {/* Creation Date filter */}
              <TableCell className={COLUMNS[2].width}>
                <DatePicker
                  value={creationDateFilter}
                  onChange={setCreationDateFilter}
                  className="h-8 w-full"
                />
              </TableCell>

              {/* Clinical Diagnosis filter */}
              <TableCell className={COLUMNS[3].width}>
                <Popover open={openDiagnosis} onOpenChange={setOpenDiagnosis}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openDiagnosis}
                      className="h-8 w-full justify-between"
                    >
                      {diagnosisFilter ? diagnosisFilter : "Filter..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search diagnosis..." className="h-9" />
                      <CommandEmpty>No diagnosis found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => {
                            setDiagnosisFilter("")
                            setOpenDiagnosis(false)
                          }}
                        >
                          All
                        </CommandItem>
                        {uniqueDiagnoses.map((diagnosis) => (
                          <CommandItem
                            key={diagnosis}
                            value={diagnosis}
                            onSelect={() => {
                              setDiagnosisFilter(diagnosis)
                              setOpenDiagnosis(false)
                            }}
                          >
                            {diagnosis}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </TableCell>

              {/* Tissue Type filter */}
              <TableCell className={COLUMNS[4].width}>
                <Popover open={openTissueType} onOpenChange={setOpenTissueType}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openTissueType}
                      className="h-8 w-full justify-between"
                    >
                      {tissueTypeFilter ? tissueTypeFilter : "Filter..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search tissue..." className="h-9" />
                      <CommandEmpty>No tissue type found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => {
                            setTissueTypeFilter("")
                            setOpenTissueType(false)
                          }}
                        >
                          All
                        </CommandItem>
                        {uniqueTissueTypes.map((tissue) => (
                          <CommandItem
                            key={tissue}
                            value={tissue}
                            onSelect={() => {
                              setTissueTypeFilter(tissue)
                              setOpenTissueType(false)
                            }}
                          >
                            {tissue}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </TableCell>

              {/* Sample Source filter */}
              <TableCell className={COLUMNS[5].width}>
                <Popover open={openSampleSource} onOpenChange={setOpenSampleSource}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openSampleSource}
                      className="h-8 w-full justify-between"
                    >
                      {sampleSourceFilter ? sampleSourceFilter : "Filter..."}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search source..." className="h-9" />
                      <CommandEmpty>No sample source found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          onSelect={() => {
                            setSampleSourceFilter("")
                            setOpenSampleSource(false)
                          }}
                        >
                          All
                        </CommandItem>
                        {uniqueSampleSources.map((source) => (
                          <CommandItem
                            key={source}
                            value={source}
                            onSelect={() => {
                              setSampleSourceFilter(source)
                              setOpenSampleSource(false)
                            }}
                          >
                            {source}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </TableCell>

              {/* Patient Name filter */}
              <TableCell className={COLUMNS[6].width}>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    placeholder="Search..."
                    value={patientNameFilter}
                    onChange={(e) => setPatientNameFilter(e.target.value)}
                    className="h-8 pl-7"
                  />
                </div>
              </TableCell>

              {/* Patient ID filter */}
              <TableCell className={COLUMNS[7].width}>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    placeholder="Search..."
                    value={patientIdFilter}
                    onChange={(e) => setPatientIdFilter(e.target.value)}
                    className="h-8 pl-7"
                  />
                </div>
              </TableCell>

              {/* Date of Birth filter */}
              <TableCell className={COLUMNS[8].width}>
                <DatePicker
                  value={dobFilter}
                  onChange={setDobFilter}
                  className="h-8 w-full"
                />
              </TableCell>

              {/* Actions - empty */}
              <TableCell className={COLUMNS[9].width}></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSamples.length > 0 ? (
              filteredSamples.map((sample) => (
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
                  <TableCell className={COLUMNS[3].width}>{sample.clinicalDiagnosis}</TableCell>
                  <TableCell className={COLUMNS[4].width}>{sample.tissueType}</TableCell>
                  <TableCell className={COLUMNS[5].width}>{sample.sampleSource}</TableCell>
                  <TableCell className={COLUMNS[6].width}>{sample.patientName}</TableCell>
                  <TableCell className={COLUMNS[7].width}>{sample.patientId}</TableCell>
                  <TableCell className={COLUMNS[8].width}>{sample.dateOfBirth}</TableCell>
                  <TableCell className={COLUMNS[9].width}>
                    <Button variant="default" size="sm" asChild>
                      <Link to={`/sample-new/${sample.id}`}>View Sample</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={COLUMNS.length} className="h-24 text-center">
                  No results found. Try adjusting your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {(statusFilter !== "all" || sampleIdFilter || creationDateFilter || diagnosisFilter || 
        tissueTypeFilter || sampleSourceFilter || patientNameFilter || patientIdFilter || dobFilter) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={resetAllFilters}
          className="bg-white shadow-sm"
        >
          Reset all filters
        </Button>
      )}
    </div>
  )
}
