import { getData } from "@/utilities/api";
import { PATIENTS_ENDPOINT } from "@/utilities/endpoints";
import {
  ChevronLeftIcon,
  CalendarDays,
  Clock,
  FileText,
  Heart,
  MessageSquare,
  Phone,
  User,
  CogIcon,
  DropletOffIcon,
  HeartPulse,
  MessageCircleIcon,
  RadioIcon,
  TimerIcon,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock patient data - in a real app, this would come from a database
const getPatientData = (id: string) => {
  return {
    id,
    name: "Sarah Johnson",
    dateOfBirth: "May 15, 1985",
    age: 38,
    gender: "Female",
    phone: "(555) 123-4567",
    email: "sarah.johnson@example.com",
    address: "123 Main Street, Anytown, CA 94123",
    insurance: "Blue Cross Blue Shield",
    policyNumber: "BCBS-12345678",
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    conditions: ["Hypertension", "Asthma"],
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { name: "Albuterol", dosage: "90mcg", frequency: "As needed" },
    ],
    appointments: [
      {
        date: "Apr 15, 2025",
        time: "10:00 AM",
        provider: "Dr. Michael Chen",
        type: "Annual Physical",
        status: "Scheduled",
      },
      {
        date: "Feb 3, 2025",
        time: "2:30 PM",
        provider: "Dr. Lisa Wong",
        type: "Follow-up",
        status: "Completed",
      },
      {
        date: "Nov 12, 2024",
        time: "11:15 AM",
        provider: "Dr. Michael Chen",
        type: "Consultation",
        status: "Completed",
      },
    ],
    vitals: [
      {
        date: "Feb 3, 2025",
        bp: "128/82",
        pulse: 72,
        temp: "98.6°F",
        weight: "154 lbs",
      },
      {
        date: "Nov 12, 2024",
        bp: "130/85",
        pulse: 75,
        temp: "98.4°F",
        weight: "156 lbs",
      },
      {
        date: "Aug 5, 2024",
        bp: "135/88",
        pulse: 78,
        temp: "98.7°F",
        weight: "158 lbs",
      },
    ],
    notes: [
      {
        date: "Feb 3, 2025",
        provider: "Dr. Lisa Wong",
        content:
          "Patient reports improved breathing with current medication regimen. Continue current treatment plan.",
      },
      {
        date: "Nov 12, 2024",
        provider: "Dr. Michael Chen",
        content:
          "Blood pressure slightly elevated. Discussed lifestyle modifications including reduced sodium intake and increased physical activity.",
      },
    ],
    profileImage: "/placeholder.svg?height=300&width=300",
  };
};

export default async function ContentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsResponse = await params;
  const patient2 = await getData(`${PATIENTS_ENDPOINT}${paramsResponse?.id}/`);
  const patient = getPatientData(params.id);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Link
          className="text-active cursor-pointer text-sm w-fit flex gap-1 items-center  hover:text-green-400"
          href="/patients"
        >
          <ChevronLeftIcon /> back
        </Link>{" "}
        {/* <section className="grid grid-cols-7 gap-3 mt-5">
          <div className="py-3 col-span-4 flex-col mx-8 transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg bg-white rounded-md">
            <div className="border-gray-400">
              <div className="flex flex-1 justify-between items-center p-4">
                <span className="flex">
                  <>
                    <img
                      className="mx-auto object-cover rounded-full h-12 w-12 "
                      src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                      alt=""
                      aria-hidden="true"
                    />
                    <span
                      aria-hidden="true"
                      className="relative bottom-0 right-0 inline-block w-3 h-3 transform -translate-x-2 translate-y-7 bg-green-300 border-2 border-white rounded-full"
                    ></span>
                  </>
                </span>
                <div className="pl-1 md:mr-">
                  <div className="text-gray-600 text-xs flex items-center">
                    <TimerIcon className="w-2 h-2 mr-2" aria-hidden="true" />{" "}
                    2:32 hours spent
                    <span>
                      <a
                        href="/"
                        className="text-xs text-indigo-700 font-medium ml-2"
                      >
                        See Time Logs
                      </a>
                    </span>
                  </div>
                  <div className="font-medium text-indigo-700 text-sm flex items-center">
                    Erica Rodrigues{" "}
                    <Clock className="w-2 h-2 ml-1" aria-hidden="true" />
                  </div>
                  <div className="text-gray-600 text-xs">23 years | Female</div>
                </div>
                <div className="pl-1 md:mr-3 text-right">
                  <div className="flex text-between text-right items-center">
                    <MessageCircleIcon
                      className="w-7 h-7 mr-2"
                      aria-hidden="true"
                    />
                    <VideoIcon className="w-7 h-7 mr-2" aria-hidden="true" />
                    <a
                      href="/"
                      className="text-xs inline-flex items-center justify-center h-8 px-2 mr-3 border border-gray-400 font-medium tracking-wide text-dark transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                      aria-label="Filter"
                      title="Filter"
                    >
                      Vital Logs
                    </a>
                    <a
                      href="/"
                      className="text-xs inline-flex items-center justify-center h-8 px-2 border border-gray-400 font-medium tracking-wide text-dark transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                      aria-label="Export"
                      title="Export"
                    >
                      Assign
                      <CogIcon className="w-4 h-4 ml-2" aria-hidden="true" />
                    </a>
                  </div>
                  <div className="text-gray-600 text-right text-xs mt-2">
                    Assign on Nov 23, 19
                  </div>
                </div>
              </div>
              <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full md:px-24">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="pl-1 md:mr-1">
                    <div className="text-gray-600 text-xs font-medium flex items-center">
                      <Heart className="w-5 h-5 mr-2" aria-hidden="true" />{" "}
                      Blood Pressure
                    </div>
                    <div className="text-gray-400 text-xs flex items-center">
                      Assigned 7 days ago
                    </div>
                    <div className="text-red-600 text-xl font-bold mt-2">
                      120/80
                    </div>
                    <div className="text-gray-400 text-xs flex items-center">
                      5 hours ago
                    </div>
                    <div className="text-gray-400 text-xs flex items-center">
                      May 23 09:00 AM
                    </div>
                  </div>
                  <div className="pl-1 md:mr-1">
                    <div className="text-gray-600 text-xs font-medium flex items-center">
                      <HeartPulse className="w-5 h-5 mr-2" aria-hidden="true" />{" "}
                      Heart Beat
                    </div>
                    <div className="text-gray-400 text-xs flex items-center">
                      Assigned 7 days ago
                    </div>
                    <div className="text-green-600 text-xl font-bold mt-2">
                      76
                    </div>
                    <div className="text-gray-400 text-xs flex items-center">
                      4 days ago
                    </div>
                  </div>
                  <div className="pl-1 md:mr-1">
                    <div className="text-gray-600 text-xs font-medium flex items-center">
                      <RadioIcon className="w-5 h-5 mr-2" aria-hidden="true" />{" "}
                      Weight
                    </div>
                    <div className="text-gray-400 text-xs flex items-center">
                      Assigned 12 days ago
                    </div>
                    <div className="text-gray-400 text-md mt-3">Waiting</div>
                  </div>
                  <div className="pl-1 md:mr-1">
                    <div className="text-gray-600 text-xs font-medium flex items-center">
                      <DropletOffIcon
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                      />{" "}
                      Blood Glucose
                    </div>
                    <div className="text-gray-400 text-xs flex items-center">
                      Assigned 2 days ago
                    </div>
                    <div className="text-gray-400 text-md mt-3">Waiting</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg bg-white rounded-md">
            <div className="card">
              <div className="flex justify-between">
                <span>Name</span>
                <span> {`${patient?.last_name}`}</span>
              </div>
            </div>
          </div>
        </section> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left sidebar with patient info */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={patient.profileImage} alt={patient.name} />
                  <AvatarFallback>
                    {patient.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{patient.name}</CardTitle>
                <CardDescription>
                  {patient.age} years • {patient.gender} • {patient.bloodType}
                </CardDescription>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-[1fr_2fr] gap-1 text-sm">
                      <span className="text-muted-foreground">DOB:</span>
                      <span>{patient.dateOfBirth}</span>
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{patient.phone}</span>
                      <span className="text-muted-foreground">Email:</span>
                      <span className="truncate">{patient.email}</span>
                      <span className="text-muted-foreground">Address:</span>
                      <span>{patient.address}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Insurance
                    </h3>
                    <div className="grid grid-cols-[1fr_2fr] gap-1 text-sm">
                      <span className="text-muted-foreground">Provider:</span>
                      <span>{patient.insurance}</span>
                      <span className="text-muted-foreground">Policy #:</span>
                      <span>{patient.policyNumber}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Medical Alerts
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {patient.allergies.map((allergy) => (
                        <Badge key={allergy} variant="destructive">
                          {allergy}
                        </Badge>
                      ))}
                      {patient.conditions.map((condition) => (
                        <Badge key={condition} variant="secondary">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div className="md:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="vitals">Vitals</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-red-500" />
                        Current Medications
                      </CardTitle>
                      <Button size="sm" variant="outline">
                        Add Medication
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y">
                      {patient.medications.map((med, index) => (
                        <div key={index} className="py-3 first:pt-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{med.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {med.dosage} • {med.frequency}
                              </p>
                            </div>
                            <Button size="sm" variant="ghost">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center">
                        <CalendarDays className="h-5 w-5 mr-2 text-blue-500" />
                        Upcoming Appointment
                      </CardTitle>
                      <Button size="sm" variant="outline">
                        Schedule
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">
                          {patient.appointments[0].type}
                        </h4>
                        <Badge>{patient.appointments[0].status}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        {patient.appointments[0].date}
                        <Clock className="h-4 w-4 ml-4 mr-2" />
                        {patient.appointments[0].time}
                      </div>
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        {patient.appointments[0].provider}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appointments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Appointment History</CardTitle>
                      <Button size="sm">Schedule New</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y">
                      {patient.appointments.map((appointment, index) => (
                        <div key={index} className="py-4 first:pt-0">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{appointment.type}</h4>
                            <Badge
                              variant={
                                appointment.status === "Completed"
                                  ? "secondary"
                                  : "default"
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <CalendarDays className="h-4 w-4 mr-2" />
                            {appointment.date}
                            <Clock className="h-4 w-4 ml-4 mr-2" />
                            {appointment.time}
                          </div>
                          <div className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            {appointment.provider}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vitals" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Vital Signs History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 font-medium">Date</th>
                            <th className="text-left py-2 font-medium">
                              Blood Pressure
                            </th>
                            <th className="text-left py-2 font-medium">
                              Pulse
                            </th>
                            <th className="text-left py-2 font-medium">
                              Temperature
                            </th>
                            <th className="text-left py-2 font-medium">
                              Weight
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {patient.vitals.map((vital, index) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="py-3">{vital.date}</td>
                              <td className="py-3">{vital.bp}</td>
                              <td className="py-3">{vital.pulse} bpm</td>
                              <td className="py-3">{vital.temp}</td>
                              <td className="py-3">{vital.weight}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Clinical Notes</CardTitle>
                      <Button size="sm">Add Note</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y">
                      {patient.notes.map((note, index) => (
                        <div key={index} className="py-4 first:pt-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="font-medium">
                                {note.provider}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {note.date}
                            </span>
                          </div>
                          <p className="text-sm mt-2">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* {status !== "" && <Alert status={status} message={message} />}  */}
    </>
  );
}
