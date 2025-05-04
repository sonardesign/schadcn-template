export interface Sample {
  id: string
  status: "blocked" | "in progress" | "done"
  creationDate: string
  patientName: string
  patientId: string
  dateOfBirth: string
  testType: string
  priority: string
  assignedTo: string
  sampleSource: string
  tissueType: string
  clinicalDiagnosis: string
  lastUpdated: string
  patient: {
    name: string
    age: number
    id: string
    location: string
  }
  source: {
    type: string
    tissue: string
    disease: string
  }
  imaging: {
    source: string
    created: string
    images: number
  }
  therapy: {
    physician: string
    hospital: string
  }
  updated: string
  disease: string
}

export const samples: Sample[] = [
  {
    id: "SAM001",
    status: "in progress",
    creationDate: "2025-04-19",
    patientName: "John Doe",
    patientId: "P001",
    dateOfBirth: "1983-05-10",
    testType: "Blood Test",
    priority: "High",
    assignedTo: "Dr. Smith",
    sampleSource: "Venous draw",
    tissueType: "Blood",
    clinicalDiagnosis: "Gene mutation analysis",
    lastUpdated: "11/25/2025",
    patient: {
      name: "John Doe",
      age: 42,
      id: "P001",
      location: "Hungary"
    },
    source: {
      type: "Venous draw",
      tissue: "Blood",
      disease: "Sarcoma"
    },
    imaging: {
      source: "Microscope",
      created: "25.03.2025",
      images: 4
    },
    therapy: {
      physician: "Dr. Smith",
      hospital: "Péterfy"
    },
    updated: "November 23, 2023",
    disease: "Sarcoma"
  },
  {
    id: "SAM002",
    status: "done",
    creationDate: "2025-04-18",
    patientName: "Jane Smith",
    patientId: "P002",
    dateOfBirth: "1990-03-22",
    testType: "Skin Biopsy",
    priority: "Medium",
    assignedTo: "Dr. Johnson",
    sampleSource: "Biopsy",
    tissueType: "Skin",
    clinicalDiagnosis: "Protein expression",
    lastUpdated: "10/15/2025",
    patient: {
      name: "Jane Smith",
      age: 35,
      id: "P002",
      location: "Germany"
    },
    source: {
      type: "Biopsy",
      tissue: "Skin",
      disease: "Melanoma"
    },
    imaging: {
      source: "Scanner",
      created: "18.04.2025",
      images: 3
    },
    therapy: {
      physician: "Dr. Johnson",
      hospital: "Charité"
    },
    updated: "November 20, 2023",
    disease: "Melanoma"
  },
  {
    id: "SAM003",
    status: "blocked",
    creationDate: "2025-04-17",
    patientName: "Alice Johnson",
    patientId: "P003",
    dateOfBirth: "1997-08-14",
    testType: "Muscle Test",
    priority: "Low",
    assignedTo: "Dr. Wilson",
    sampleSource: "Biopsy",
    tissueType: "Muscle",
    clinicalDiagnosis: "Cellular response",
    lastUpdated: "09/30/2025",
    patient: {
      name: "Alice Johnson",
      age: 28,
      id: "P003",
      location: "Austria"
    },
    source: {
      type: "Biopsy",
      tissue: "Muscle",
      disease: "Myopathy"
    },
    imaging: {
      source: "MRI",
      created: "17.04.2025",
      images: 6
    },
    therapy: {
      physician: "Dr. Wilson",
      hospital: "AKH Wien"
    },
    updated: "November 18, 2023",
    disease: "Myopathy"
  },
  {
    id: "SAM004",
    status: "done",
    creationDate: "2025-04-16",
    patientName: "Bob Wilson",
    patientId: "P004",
    dateOfBirth: "1972-11-30",
    testType: "Blood Test",
    priority: "High",
    assignedTo: "Dr. Brown",
    sampleSource: "Venous draw",
    tissueType: "Blood",
    clinicalDiagnosis: "Enzyme activity",
    lastUpdated: "08/22/2025",
    patient: {
      name: "Bob Wilson",
      age: 53,
      id: "P004",
      location: "France"
    },
    source: {
      type: "Venous draw",
      tissue: "Blood",
      disease: "Leukemia"
    },
    imaging: {
      source: "Microscope",
      created: "16.04.2025",
      images: 5
    },
    therapy: {
      physician: "Dr. Brown",
      hospital: "Hôpital Saint-Louis"
    },
    updated: "November 15, 2023",
    disease: "Leukemia"
  },
  {
    id: "SAM005",
    status: "blocked",
    creationDate: "2025-04-15",
    patientName: "Carol Brown",
    patientId: "P005",
    dateOfBirth: "1978-02-05",
    testType: "Skin Test",
    priority: "Medium",
    assignedTo: "Dr. Davis",
    sampleSource: "Biopsy",
    tissueType: "Skin",
    clinicalDiagnosis: "Protein folding",
    lastUpdated: "07/10/2025",
    patient: {
      name: "Carol Brown",
      age: 47,
      id: "P005",
      location: "Italy"
    },
    source: {
      type: "Biopsy",
      tissue: "Skin",
      disease: "Psoriasis"
    },
    imaging: {
      source: "Scanner",
      created: "15.04.2025",
      images: 2
    },
    therapy: {
      physician: "Dr. Davis",
      hospital: "Ospedale San Raffaele"
    },
    updated: "November 10, 2023",
    disease: "Psoriasis"
  }
]
