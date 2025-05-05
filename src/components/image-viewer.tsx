import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { samples } from "@/lib/data"

export function ImageViewer() {
  const { id, imageIndex = "0" } = useParams()
  const navigate = useNavigate()
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(parseInt(imageIndex || "0"))
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Find the current sample and its index
  useEffect(() => {
    const index = samples.findIndex(s => s.id === id)
    if (index !== -1) {
      setCurrentSampleIndex(index)
    } else {
      // If sample not found, navigate back to samples list
      navigate('/')
    }
    
    // Parse image index
    if (imageIndex) {
      setCurrentImageIndex(parseInt(imageIndex))
    }
  }, [id, imageIndex, navigate])
  
  // Get the current sample
  const sample = samples[currentSampleIndex]
  
  // Handle navigation to previous sample
  const goToPreviousImage = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : 3 // Assuming 4 images total (main + 3 thumbnails)
    navigate(`/image-viewer/${sample.id}/${newIndex}`)
  }
  
  // Handle navigation to next sample
  const goToNextImage = () => {
    const newIndex = currentImageIndex < 3 ? currentImageIndex + 1 : 0 // Assuming 4 images total (main + 3 thumbnails)
    navigate(`/image-viewer/${sample.id}/${newIndex}`)
  }
  
  // Handle zoom in
  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3)) // Max zoom 3x
  }
  
  // Handle zoom out
  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5)) // Min zoom 0.5x
  }
  
  // Handle reset zoom and position
  const resetView = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }
  
  // Handle mouse wheel for zooming
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      setScale(prev => Math.min(prev + 0.1, 3)) // Zoom in, max 3x
    } else {
      setScale(prev => Math.max(prev - 0.1, 0.5)) // Zoom out, min 0.5x
    }
  }
  
  // Handle mouse down for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }
  
  // Handle mouse move for panning
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y
    
    setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }))
    setDragStart({ x: e.clientX, y: e.clientY })
  }
  
  // Handle mouse up to stop panning
  const handleMouseUp = () => {
    setIsDragging(false)
  }
  
  // If no sample is loaded yet, show loading state
  if (!sample) {
    return <div className="p-8">Loading...</div>
  }

  // Get the current image source
  const getImageSource = () => {
    if (currentImageIndex === 0) {
      return `https://placehold.co/1200x900/e2e8f0/1e293b?text=Sample+${sample.id}`
    } else {
      return `https://placehold.co/1200x900/e2e8f0/1e293b?text=Image+${currentImageIndex}`
    }
  }

  return (
    <div className="w-full min-h-screen bg-background-2 flex flex-col">
      {/* Top navigation */}
      <div className="w-full p-4 flex justify-between items-center bg-background shadow-sm">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate(`/sample-new/${sample.id}`)}>
            <Home className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Sample {sample.id} - Image {currentImageIndex + 1}/4
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousImage}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextImage}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={resetView}>
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 p-4 gap-4 overflow-hidden">
        {/* Image viewer area */}
        <div 
          className="flex-1 bg-white rounded-md shadow-sm overflow-hidden cursor-move"
          ref={containerRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ 
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
          >
            <img 
              src={getImageSource()} 
              alt={`Sample ${sample.id} - Image ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              draggable="false"
            />
          </div>
        </div>
        
        {/* Details panel */}
        <Card className="w-[350px] shadow-sm">
          <CardHeader className="p-4">
            <h3 className="text-lg font-semibold">Image Details</h3>
          </CardHeader>
          <CardContent className="px-4 pb-4 flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Sample Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sample ID</span>
                  <span className="text-sm font-medium">{sample.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Test Type</span>
                  <span className="text-sm">{sample.testType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-sm">{sample.status}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2">Patient Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Name</span>
                  <span className="text-sm">{sample.patient.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Age</span>
                  <span className="text-sm">{sample.patient.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">ID</span>
                  <span className="text-sm">{sample.patient.id}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2">Image Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Source</span>
                  <span className="text-sm">{sample.imaging.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-sm">{sample.imaging.created}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Disease</span>
                  <span className="text-sm">{sample.source.disease}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tissue</span>
                  <span className="text-sm">{sample.source.tissue}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2">Image Controls</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Mouse wheel to zoom in/out</li>
                <li>• Click and drag to pan</li>
                <li>• Use buttons above to navigate</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
