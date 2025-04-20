import { createBrowserRouter } from "react-router-dom"
import { SamplesTable } from "@/components/samples-table"
import { SamplePage } from "@/components/sample-page"
import { Layout } from "@/components/layout"

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
    ],
  },
])
