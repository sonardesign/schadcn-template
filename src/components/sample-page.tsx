import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { samples } from "@/lib/data"
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SamplePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const sample = samples.find(s => s.id === id)

  if (!sample) {
    return <div>Sample not found</div>
  }

  return (
    <div className="p-6 py-6">
      <div className="flex-row items-center space-x-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">
          {sample.testType} - {sample.id} - {sample.hypothesis}
        </h1>
      </div>

      {/* Header with full-width data listing */}
      <Card className="mb-8 shadow bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center space-x-4">
            <div>
              <div className="text-sm text-muted-foreground">Creation Date</div>
              <div className="font-medium mt-1">{sample.creationDate}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Status</div>
              <div className="font-medium mt-1">
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
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Priority</div>
              <div className="font-medium mt-1">{sample.priority}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Assigned To</div>
              <div className="font-medium mt-1">{sample.assignedTo}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Patient Name</div>
              <div className="font-medium mt-1">{sample.patientName}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Patient ID</div>
              <div className="font-medium mt-1">{sample.patientId}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Tissue Type</div>
              <div className="font-medium mt-1">{sample.tissueType}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Sample Source</div>
              <div className="font-medium mt-1">{sample.sampleSource}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two-column layout with resizable panels */}
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[600px] rounded-lg border"
      >
        {/* Left panel - Cell images */}
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <div className="text-center">
              <div className="text-muted-foreground mb-2">Cell Images</div>
              {/* Add your cell images here */}
              <div className="rounded-lg border-2 border-dashed p-12">
                Image Placeholder
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right panel - Image data and annotations */}
        <ResizablePanel defaultSize={50}>
          <div className="p-6">
            {/* Image data */}
            <Card className="mb-6 shadow bg-white">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Image Data</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size</span>
                    <span>1920x1080</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Origin</span>
                    <span>Lab A</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Microscope Type</span>
                    <span>Electron</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Annotations accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="annotations">
                <AccordionTrigger>Annotations</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2">
                      <span>Annotation 1</span>
                      <span className="text-muted-foreground">Cell structure identified</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span>Annotation 2</span>
                      <span className="text-muted-foreground">Abnormal growth detected</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span>Annotation 3</span>
                      <span className="text-muted-foreground">Sample quality check</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
