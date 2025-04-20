import { samples } from "@/lib/data"

interface SamplePageProps {
  params: {
    id: string
  }
}

export default function SamplePage({ params }: SamplePageProps) {
  const sample = samples.find(s => s.id === params.id)

  if (!sample) {
    return <div>Sample not found</div>
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-8">Sample Details</h1>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="font-medium">Status</div>
          <div>{sample.status}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="font-medium">Creation Date</div>
          <div>{sample.creationDate}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="font-medium">Patient Name</div>
          <div>{sample.patientName}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="font-medium">Patient ID</div>
          <div>{sample.patientId}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="font-medium">Test Type</div>
          <div>{sample.testType}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="font-medium">Priority</div>
          <div>{sample.priority}</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="font-medium">Assigned To</div>
          <div>{sample.assignedTo}</div>
        </div>
      </div>
    </div>
  )
}
