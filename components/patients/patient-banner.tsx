"use client";
import React from "react";
import { format, formatDistanceToNow } from "date-fns";

import {
  CalendarDays,
  Clock,
  FileText,
  Heart,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StartVisit from "@/components/visits/start-visit";
import AddMedicationForm from "@/components/patients/add-medication";
import { Button } from "@/components/ui/button";
import { Appointment, ClinicalNote, Patient, Vital } from "@/types/data";
import AddClinicalNoteForm from "./add-note";
import { constructUserName } from "@/lib/utils";
import {  getDataRq } from "@/utilities/api";
import AddAppointmentForm from "./add-appointment";
import { PATIENTS_ENDPOINT, VITALS_ENDPOINT } from "@/utilities/endpoints";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

type Props = {
  patient: Patient;
};
const PatientBanner = ({ patient }: Props) => {
  const patientId = patient._id;

  const patientAge = formatDistanceToNow(new Date(patient?.date_of_birth), {
    addSuffix: false,
  });
  const patientName = `${patient.first_name} ${patient.last_name}`;

const { data: appointments = [], isPending: loadingAppointments } = useQuery<Appointment[]>({
  queryKey: ["appointments", patientId],
  queryFn: () => getDataRq<Appointment[]>(`${PATIENTS_ENDPOINT}${patientId}/appointments`),
});

  const { data: notes = [], isPending: loadingNotes } = useQuery<ClinicalNote[]>({
    queryKey: ["clinical-notes", patientId],
    queryFn: () => getDataRq<ClinicalNote[]>(`${PATIENTS_ENDPOINT}${patientId}/clinical-notes`),
  });

  const { data: vitals = [], isPending: loadingVitals } = useQuery<Vital[]>({
    queryKey: ["vitals", patientId],
    queryFn: () => getDataRq<Vital[]>(`${VITALS_ENDPOINT}patient/${patientId}`),
  });

  const isLoading = loadingAppointments || loadingNotes || loadingVitals;

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="flex flex-col space-y-3" key={index}>
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
        <div className="min-h-[100vh] animate-pulse flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left sidebar with patient info */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-2">
                <AvatarFallback>
                  {patientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{`${patient.salutation} ${patientName}`}</CardTitle>
              <CardDescription>
                {patientAge} years • {patient.gender} • {patient.blood_group}
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
                <StartVisit fromVisitsPage={false}/>
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
                    <span>{patient.date_of_birth}</span>
                    <span className="text-muted-foreground">Phone:</span>
                    <span>{patient.phone_number}</span>
                    <span className="text-muted-foreground">Email:</span>
                    <span className="truncate">{patient.email}</span>
                    <span className="text-muted-foreground">Address:</span>
                    <span>{patient.address}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Next Of Kin
                  </h3>
                  <div className="grid grid-cols-[1fr_2fr] gap-1 text-sm">
                    <span className="text-muted-foreground">
                      Emergency Contact:
                    </span>
                    <span>{patient.emergency_contact}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Medical Alerts
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {patient.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Underlying Conditions
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {patient.underlying_conditions.map((condition, index) => (
                      <Badge key={index} variant="default">
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
                    <AddMedicationForm patientId={patient._id} />
                  </div>
                </CardHeader>
                {patient.medications && (
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
                )}
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <CalendarDays className="h-5 w-5 mr-2 text-blue-500" />
                      Upcoming Appointment
                    </CardTitle>
                    <AddAppointmentForm patientId={patientId} />
                  </div>
                </CardHeader>
                <CardContent>
                  {appointments.length ? (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{appointments[0].type}</h4>
                        <Badge>{appointments[0].status}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        {format(appointments[0].date, "PPP")}
                        <Clock className="h-4 w-4 ml-4 mr-2" />
                        {appointments[0].time}
                      </div>
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        {constructUserName(appointments[0].medicalProvider_id)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No appointments scheduled.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Appointment History</CardTitle>
                    <AddAppointmentForm patientId={patientId} />
                  </div>
                </CardHeader>
                <CardContent>
                  {appointments.length ? (
                    <div className="divide-y">
                      {appointments.map((appointment, index: number) => (
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
                            {format(appointment.date, "PPP")}
                            <Clock className="h-4 w-4 ml-4 mr-2" />
                            {appointment.time}
                          </div>
                          <div className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            {constructUserName(appointment.medicalProvider_id)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No appointments scheduled.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vitals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vital Signs History</CardTitle>
                </CardHeader>
                <CardContent>
                  {vitals?.length ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 font-medium">Date</th>
                            <th className="text-left py-2 font-medium">
                              Blood Pressure
                            </th>
                            <th className="text-left py-2 font-medium">
                              Pulse Rate
                            </th>
                            <th className="text-left py-2 font-medium">
                              Body Temperature
                            </th>
                            <th className="text-left py-2 font-medium">
                              Weight
                            </th>
                            <th className="text-left py-2 font-medium">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {vitals.map((vital, index) => (
                            <tr key={index} className="border-b last:border-0">
                              <td className="py-3">
                                {vital.createdAt
                                  ? format(vital.createdAt, "PPP")
                                  : "-"}
                              </td>
                              <td className="py-3">
                                {vital.blood_pressure} mmHg
                              </td>
                              <td className="py-3">{vital.pulse_rate} bpm</td>
                              <td className="py-3">
                                {vital.body_temperature}°C
                              </td>
                              <td className="py-3">{vital.weight} lbs</td>
                              <td className="py-3">
                                {vital.health_status} lbs
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No vitals recorded.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Clinical Notes</CardTitle>
                    <AddClinicalNoteForm patientId={patient._id} />
                  </div>
                </CardHeader>
                <CardContent>
                  {notes?.length ? (
                    <div className="divide-y">
                      {notes.map(
                        ({ medicalProvider_id, createdAt, content }, index) => (
                          <div key={index} className="py-4 first:pt-0">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="font-medium">
                                  {constructUserName(medicalProvider_id)}
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                <time>
                                  {new Date(createdAt).toLocaleDateString()}
                                </time>
                              </span>
                            </div>
                            <p className="text-sm mt-2">{content}</p>
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No clinical notes recorded.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default PatientBanner;
