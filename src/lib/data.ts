export interface Sample {
  id: string
  status: "blocked" | "in progress" | "done"
  creationDate: string
  patientName: string
  patientId: string
  testType: string
  priority: string
  assignedTo: string
  sampleSource: string
  tissueType: string
  hypothesis: string
}

export const samples: Sample[] = [
  {
    id: "SAM001",
    status: "in progress",
    creationDate: "2025-04-19",
    patientName: "John Doe",
    patientId: "P001",
    testType: "Blood Test",
    priority: "High",
    assignedTo: "Dr. Smith",
    sampleSource: "Venous draw",
    tissueType: "Blood",
    hypothesis: "Gene mutation analysis"
  },
  {
    id: "SAM002",
    status: "done",
    creationDate: "2025-04-18",
    patientName: "Jane Smith",
    patientId: "P002",
    testType: "Skin Biopsy",
    priority: "Medium",
    assignedTo: "Dr. Johnson",
    sampleSource: "Biopsy",
    tissueType: "Skin",
    hypothesis: "Protein expression"
  },
  {
    id: "SAM003",
    status: "blocked",
    creationDate: "2025-04-17",
    patientName: "Alice Johnson",
    patientId: "P003",
    testType: "Muscle Test",
    priority: "Low",
    assignedTo: "Dr. Wilson",
    sampleSource: "Biopsy",
    tissueType: "Muscle",
    hypothesis: "Cellular response"
  },
  {
    id: "SAM004",
    status: "done",
    creationDate: "2025-04-16",
    patientName: "Bob Wilson",
    patientId: "P004",
    testType: "Blood Test",
    priority: "High",
    assignedTo: "Dr. Brown",
    sampleSource: "Venous draw",
    tissueType: "Blood",
    hypothesis: "Enzyme activity"
  },
  {
    id: "SAM005",
    status: "blocked",
    creationDate: "2025-04-15",
    patientName: "Carol Brown",
    patientId: "P005",
    testType: "Skin Test",
    priority: "Medium",
    assignedTo: "Dr. Davis",
    sampleSource: "Biopsy",
    tissueType: "Skin",
    hypothesis: "Protein folding"
  }
]
