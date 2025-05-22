import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { samples } from "@/lib/data"
import OpenSeadragon from "openseadragon"

export function ImageViewer() {
  const { id, imageIndex = "0" } = useParams()
  const navigate = useNavigate()
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(parseInt(imageIndex || "0"))
  const viewerRef = useRef<OpenSeadragon.Viewer | null>(null)
  const viewerContainerRef = useRef<HTMLDivElement>(null)
  
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
  
  // Initialize OpenSeaDragon viewer
  useEffect(() => {
    if (viewerContainerRef.current && !viewerRef.current) {
      viewerRef.current = OpenSeadragon({
        id: viewerContainerRef.current.id,
        prefixUrl: "https://cdn.jsdelivr.net/npm/openseadragon@2.4/build/openseadragon/images/",
        animationTime: 0.5,
        blendTime: 0.1,
        constrainDuringPan: true,
        maxZoomPixelRatio: 2,
        minZoomLevel: 0.5,
        visibilityRatio: 0.2,
        zoomPerScroll: 1.2,
        showNavigator: true,
        navigatorPosition: "BOTTOM_RIGHT",
        showRotationControl: true,
        showHomeControl: true,
        showZoomControl: true,
        showFullPageControl: false,
      })
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [])

  // Update the image when image index changes
  useEffect(() => {
    if (viewerRef.current && sample) {
      // Get the current image URL
      const imageUrl = getImageSource()

      // Add the new tile source
      viewerRef.current.open({
        type: 'image',
        url: imageUrl,
        buildPyramid: false,
      })
    }
  }, [currentImageIndex, currentSampleIndex])
  
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
    if (viewerRef.current) {
      viewerRef.current.viewport.zoomBy(1.5)
    }
  }
  
  // Handle zoom out
  const zoomOut = () => {
    if (viewerRef.current) {
      viewerRef.current.viewport.zoomBy(0.667)
    }
  }
  
  // Handle reset view
  const resetView = () => {
    if (viewerRef.current) {
      viewerRef.current.viewport.goHome()
    }
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
        {/* OpenSeadragon viewer */}
        <div 
          id="openseadragon-viewer"
          ref={viewerContainerRef}
          className="flex-1 bg-white rounded-md shadow-sm overflow-hidden"
          style={{ position: 'relative' }}
        />
        
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
