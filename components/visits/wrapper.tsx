"use client";

import React from "react";
import VisitBanner from "./banner";

import {
  FileText,
  Activity,
  Stethoscope,
  FlaskRoundIcon as Flask,
  Receipt,
  Pill,
  Clipboard,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Vitals from "./vitals";
import Diagnosis from "./diagnosis";
import Tests from "./tests";
import Invoices from "./invoices";
import Treatment from "./treatment";
import Medications from "./medication";
import Notes from "./notes";
import { Visit } from "@/types/data";

interface Props {
  visit: Visit;
}
const mockVisit = {
  _id: "V-12345",
  date: "April 27, 2025",
  time: "10:30 AM",
  status: "Completed",
  type: "Follow-up",
  duration: "30 minutes",
  doctor: "Dr. Sarah Johnson",
  department: "Cardiology",
  location: "Main Hospital, Room 302",
  notes:
    "Patient reported improvement in symptoms. Continue current medication regimen.",
};

const patient = {
  _id: "P-5678",
  name: "Robert Anderson",
  age: 45,
  gender: "Male",
  dob: "05/12/1980",
  phone: "(555) 123-4567",
  email: "robert.anderson@example.com",
  address: "123 Main St, Anytown, CA 94123",
  insurance: "BlueCross Health Plan",
  insuranceId: "BC987654321",
};
const VisitWrapper = ({ visit }: Props) => {
  console.log(visit, "visit");
  return (
    <section>
      {/* Banner */}
      <VisitBanner patient={patient} visit={mockVisit} />

      {/* Tabs for different sections */}
      <Tabs defaultValue="vitals" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full">
          <TabsTrigger value="vitals" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden md:inline">Vitals</span>
          </TabsTrigger>
          <TabsTrigger value="diagnosis" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            <span className="hidden md:inline">Diagnosis</span>
          </TabsTrigger>
          <TabsTrigger value="tests" className="flex items-center gap-2">
            <Flask className="h-4 w-4" />
            <span className="hidden md:inline">Tests</span>
          </TabsTrigger>
          <TabsTrigger value="treatment" className="flex items-center gap-2">
            <Clipboard className="h-4 w-4" />
            <span className="hidden md:inline">Treatment</span>
          </TabsTrigger>
          <TabsTrigger value="medication" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            <span className="hidden md:inline">Medication</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Notes</span>
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            <span className="hidden md:inline">Invoices</span>
          </TabsTrigger>
        </TabsList>

        {/* Vitals Tab */}
        <TabsContent value="vitals">
          <Vitals patientId={visit?.patient_id?._id} visitId={visit?._id} />
        </TabsContent>

        {/* Diagnosis Tab */}
        <TabsContent value="diagnosis">
          <Diagnosis visitId={visit?._id} />
        </TabsContent>

        {/* Tests Tab */}
        <TabsContent value="tests">
          <Tests visitId={visit?._id} />
        </TabsContent>

        {/* Treatment Tab */}
        <TabsContent value="treatment">
          <Treatment visit={mockVisit} />
        </TabsContent>

        {/* Medication Tab */}
        <TabsContent value="medication">
          <Medications visitId={visit?._id} patientId={visit?.patient_id?._id} />
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes">
          <Notes  visitId={visit?._id} />
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices">
          <Invoices visit={mockVisit} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default VisitWrapper;
