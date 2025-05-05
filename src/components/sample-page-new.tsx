import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight, MoreVertical, UserPlus, ClipboardList, Trash, FileText } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useNavigate, useParams } from "react-router-dom"
import { samples } from "@/lib/data"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/custom-sheet"

export function SamplePageNew() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0)
  const [isAnamnesisSheetOpen, setIsAnamnesisSheetOpen] = useState(false)
  const [isReportSheetOpen, setIsReportSheetOpen] = useState(false)
  
  // Find the current sample and its index
  useEffect(() => {
    const index = samples.findIndex(s => s.id === id)
    if (index !== -1) {
      setCurrentSampleIndex(index)
    } else {
      // If sample not found, navigate back to samples list
      navigate('/')
    }
  }, [id, navigate])
  
  // Get the current sample
  const sample = samples[currentSampleIndex]
  
  // Handle navigation to previous sample
  const goToPreviousSample = () => {
    const prevIndex = currentSampleIndex > 0 ? currentSampleIndex - 1 : samples.length - 1
    navigate(`/sample-new/${samples[prevIndex].id}`)
  }
  
  // Handle navigation to next sample
  const goToNextSample = () => {
    const nextIndex = currentSampleIndex < samples.length - 1 ? currentSampleIndex + 1 : 0
    navigate(`/sample-new/${samples[nextIndex].id}`)
  }
  
  // If no sample is loaded yet, show loading state
  if (!sample) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="w-full min-h-screen bg-background-2 flex flex-col">
      
      {/* Main content */}
      <main className="w-full px-9 py-6 flex flex-col gap-4">
        {/* Two column layout */}
        <div className="flex gap-4">
          {/* Left column: Sample details */}
          <Card className="w-96 shadow-sm">
            {/* Card header area */}
            <div className="p-6 bg-slate-100/50 flex flex-col gap-6">
              {/* Sample ID and badge */}
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="w-7 h-7 bg-background"
                  onClick={() => navigate('/')}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="text-xl font-semibold">{sample.id}</h2>
                <Badge className="bg-primary text-white rounded-full text-xs font-semibold">
                  {sample.status}
                </Badge>
              </div>
              
              {/* Test type and controls */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{sample.testType}</h3>
                  <p className="text-sm text-muted-foreground">Last updated: {sample.lastUpdated}</p>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-10 h-8 p-0"
                    onClick={goToPreviousSample}
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-primary" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="w-10 h-8 p-0">
                        <MoreVertical className="w-3.5 h-3.5 text-primary" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem className="cursor-pointer">
                        <ClipboardList className="mr-2 h-4 w-4" />
                        <span>Reassign</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Invite user</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Next sample controls */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Next sample</span>
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="w-6 h-6 p-0"
                    onClick={goToPreviousSample}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="w-6 h-6 p-0"
                    onClick={goToNextSample}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Sample details content */}
            <div className="p-6 flex flex-col gap-3">
              {/* Patient details */}
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold">Sample Details</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Patient name, Age</span>
                    <div className="flex gap-6">
                      <span className="text-sm">{sample.patient.name}</span>
                      <span className="text-sm">{sample.patient.age}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Patient ID</span>
                    <span className="text-sm">{sample.patient.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Location</span>
                    <span className="text-sm">{sample.patient.location}</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-2" />
              
              {/* Sample source details */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sample source</span>
                  <span className="text-sm">{sample.source.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tissue type</span>
                  <span className="text-sm">{sample.source.tissue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Disease</span>
                  <span className="text-sm">{sample.source.disease}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {/* Imaging details */}
              <h4 className="text-sm font-semibold">Imaging details</h4>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Image source</span>
                  <span className="text-sm">{sample.imaging.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Source created</span>
                  <span className="text-sm">{sample.imaging.created}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Images</span>
                  <span className="text-sm">{sample.imaging.images}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {/* Therapy details */}
              <h4 className="text-sm font-semibold">Therapy & Medical Illusion</h4>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Physician</span>
                <span className="text-sm">{sample.therapy.physician}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Hospital</span>
                <span className="text-sm">{sample.therapy.hospital}</span>
              </div>
            </div>
            
            {/* Card footer */}
            <div className="h-16 p-6 bg-slate-100/50 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Updated {sample.updated}</span>
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="w-6 h-6 p-0"
                  onClick={goToPreviousSample}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="w-6 h-6 p-0"
                  onClick={goToNextSample}
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Main content area - using flex row layout */}
          <div className="flex-1 flex gap-4">
            {/* Sample assets card */}
            <Card className="flex-1 shadow-sm">
              <CardHeader className="p-6 gap-1.5">
                <h3 className="text-lg font-semibold">Sample assets</h3>
                <p className="text-sm text-muted-foreground">
                  {sample.hypothesis}
                </p>
              </CardHeader>
              <CardContent className="px-6 pb-6 flex gap-6">
                {/* Image thumbnails */}
                <div className="flex flex-col gap-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="w-52 h-52 rounded-md overflow-hidden">
                      <img 
                        className="w-full h-full object-cover" 
                        src={`https://placehold.co/215x215/e2e8f0/1e293b?text=Image+${index + 1}`} 
                        alt={`Thumbnail ${index + 1}`} 
                      />
                    </div>
                  ))}
                </div>
                
                {/* Main image */}
                <div className="flex-1 h-[695px] rounded-md overflow-hidden cursor-pointer" 
                  onClick={() => navigate(`/image-viewer/${sample.id}/0`)}
                >
                  <img 
                    className="w-full h-full object-cover" 
                    src={`https://placehold.co/695x695/e2e8f0/1e293b?text=Sample+${sample.id}`} 
                    alt="Main sample" 
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Descriptions card */}
            <Card className="w-[550px] shadow-sm">
              <CardHeader className="p-4">
                <h3 className="text-lg font-semibold">Descriptions</h3>
              </CardHeader>
              <CardContent className="px-4 pb-4 flex flex-col gap-6">
                {/* Report section */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-semibold">Report</h4>
                  <Card className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm">Report attached to this sample available here</p>
                      <p className="text-xs text-muted-foreground">Last saved - 2025.06.08</p>
                    </div>
                    <Sheet open={isReportSheetOpen} onOpenChange={setIsReportSheetOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                          Open
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" width="custom" className="w-[550px] overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Sample Report
                          </SheetTitle>
                          <SheetDescription>
                            Last updated on 2025.06.08
                          </SheetDescription>
                        </SheetHeader>
                        <div className="my-6 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Sample Information</h4>
                            <div className="rounded-md bg-muted/50 p-4 text-sm">
                              <p><span className="font-medium">Sample ID:</span> {sample.id}</p>
                              <p><span className="font-medium">Test Type:</span> {sample.testType}</p>
                              <p><span className="font-medium">Status:</span> {sample.status}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Findings</h4>
                            <p className="text-sm">Microscopic examination of the {sample.source.tissue} sample reveals cellular abnormalities consistent with early-stage {sample.source.disease}. Cell morphology shows characteristic changes in nuclear structure and cytoplasmic organization.</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Histopathology</h4>
                            <p className="text-sm">Tissue sections demonstrate moderate cellular atypia with increased nuclear-to-cytoplasmic ratio. Mitotic figures are present but not abundant. No evidence of vascular or lymphatic invasion observed in the examined sections.</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Immunohistochemistry</h4>
                            <ul className="list-disc text-sm pl-5 space-y-1">
                              <li>Ki-67 proliferation index: 15%</li>
                              <li>p53: Focally positive</li>
                              <li>CD45: Negative</li>
                              <li>Cytokeratin AE1/AE3: Positive</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Molecular Studies</h4>
                            <p className="text-sm">Next-generation sequencing identified mutations in the following genes:</p>
                            <ul className="list-disc text-sm pl-5 space-y-1">
                              <li>BRAF V600E mutation detected</li>
                              <li>NRAS wild type</li>
                              <li>TERT promoter mutation present</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Interpretation</h4>
                            <p className="text-sm">The histopathological features and molecular profile are consistent with {sample.source.disease}. The findings suggest a moderately differentiated lesion with intermediate proliferative activity.</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                            <p className="text-sm">Clinical correlation is recommended. Consider additional imaging studies to evaluate for potential metastasis. The molecular profile suggests potential responsiveness to targeted therapies.</p>
                          </div>
                        </div>
                        <SheetFooter>
                          <Button variant="outline" onClick={() => setIsReportSheetOpen(false)}>Close</Button>
                          <Button>Download Report</Button>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </Card>
                </div>
                
                {/* Anamnesis section */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-semibold">Anamnesis</h4>
                  <Card className="p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm">Anamnesis attached to this sample available here</p>
                      <p className="text-xs text-muted-foreground">Anamnesis created by - Dr Kővári Elvira - 2025.04.02</p>
                    </div>
                    <Sheet open={isAnamnesisSheetOpen} onOpenChange={setIsAnamnesisSheetOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                          Open
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" width="custom" className="w-[550px] overflow-y-auto">
                        <SheetHeader>
                          <SheetTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Anamnesis Report
                          </SheetTitle>
                          <SheetDescription>
                            Created by Dr Kővári Elvira on 2025.04.02
                          </SheetDescription>
                        </SheetHeader>
                        <div className="my-6 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Patient Information</h4>
                            <div className="rounded-md bg-muted/50 p-4 text-sm">
                              <p><span className="font-medium">Name:</span> {sample.patient.name}</p>
                              <p><span className="font-medium">Age:</span> {sample.patient.age}</p>
                              <p><span className="font-medium">ID:</span> {sample.patient.id}</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Chief Complaint</h4>
                            <p className="text-sm">Patient presents with recurring pain in the lower right abdomen persisting for 3 weeks with increasing intensity.</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">History of Present Illness</h4>
                            <p className="text-sm">Pain began after a long international flight 3 weeks ago. Initially mild but has increased in intensity. Patient reports the pain is worse after meals and when lying flat. No fever or nausea reported.</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Past Medical History</h4>
                            <ul className="list-disc text-sm pl-5 space-y-1">
                              <li>Type 2 diabetes, diagnosed 2023</li>
                              <li>Hypertension, well-controlled with medication</li>
                              <li>Previous appendectomy in 2018</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Current Medications</h4>
                            <ul className="list-disc text-sm pl-5 space-y-1">
                              <li>Metformin 500mg twice daily</li>
                              <li>Amlodipine 5mg once daily</li>
                              <li>Vitamin D 2000 IU daily</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Physical Examination</h4>
                            <p className="text-sm">Patient is alert and oriented. Vitals stable. Abdomen soft with tenderness in the right lower quadrant. No rebound tenderness or guarding. Bowel sounds normal.</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Assessment</h4>
                            <p className="text-sm">Suspected {sample.source.disease} based on symptoms and physical examination. Ordering imaging and blood work to confirm diagnosis.</p>
                          </div>
                        </div>
                        <SheetFooter>
                          <Button variant="outline" onClick={() => setIsAnamnesisSheetOpen(false)}>Close</Button>
                          <Button>Download Report</Button>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </Card>
                </div>
                
                {/* Annotations section */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-semibold">Annotations</h4>
                  <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-sm py-3">
                          Annotation {index + 1}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-muted-foreground">
                            This is the detailed content for annotation {index + 1}.
                            {index === 0 && " This annotation is expanded by default."}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
