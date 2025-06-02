import { createBrowserRouter } from "react-router-dom"
import { SamplesTable } from "@/components/samples-table"
import { SamplePage } from "@/components/sample-page"
import { SamplePageNew } from "@/components/sample-page-new"
import { Layout } from "@/components/layout"
import { WhiteboardPage } from "@/components/whiteboard-page"

// Creating a stub ImageViewer component since it seems to be missing
const ImageViewer = () => (
  <div className="flex-1 space-y-4 p-8 pt-6">
    <h2 className="text-3xl font-bold tracking-tight">Image Viewer</h2>
    <p className="text-muted-foreground">This is a placeholder for the image viewer component.</p>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Samples</h2>
            </div>
            <div className="space-y-4">
              <SamplesTable />
            </div>
          </div>
        ),
      },
      {
        path: "sample/:id",
        element: <SamplePage />,
      },
      {
        path: "sample-new/:id",
        element: <SamplePageNew />,
      },
      {
        path: "image-viewer/:id/:imageIndex?",
        element: <ImageViewer />,
      },
      {
        path: "whiteboard",
        element: <WhiteboardPage />,
      },
    ],
  },
])
