import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CalendarDays, Plus, Search } from "lucide-react"

// Mock patients data
const patients = [
  {
    id: "1",
    name: "Sarah Johnson",
    age: 38,
    gender: "Female",
    conditions: ["Hypertension", "Asthma"],
    nextAppointment: "Apr 15, 2025",
    profileImage: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    name: "Robert Chen",
    age: 45,
    gender: "Male",
    conditions: ["Diabetes Type 2"],
    nextAppointment: "Apr 22, 2025",
    profileImage: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    age: 29,
    gender: "Female",
    conditions: ["Anxiety"],
    nextAppointment: "Apr 18, 2025",
    profileImage: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "4",
    name: "James Wilson",
    age: 62,
    gender: "Male",
    conditions: ["Arthritis", "Hypertension"],
    nextAppointment: "Apr 30, 2025",
    profileImage: "/placeholder.svg?height=300&width=300",
  },
]

export default function PatientsPage() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Patients</h1>
          <p className="text-muted-foreground">Manage and view patient profiles</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search patients..." className="pl-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <Link href={`/patients/${patient.id}`} key={patient.id}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage src={patient.profileImage} alt={patient.name} />
                  <AvatarFallback>
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{patient.name}</CardTitle>
                  <CardDescription>
                    {patient.age} years • {patient.gender}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {patient.conditions.map((condition) => (
                    <Badge key={condition} variant="secondary">
                      {condition}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Next appointment: {patient.nextAppointment}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

