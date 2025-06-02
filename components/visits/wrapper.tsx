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
import { Visit, Patient } from "@/types/data";

interface Props {
  visit: Visit;
  patient: Patient;
}

const VisitWrapper = ({ visit, patient }: Props) => {
  return (
    <section>
      {/* Banner */}
      <VisitBanner patient={patient} visit={visit} />

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
          <Treatment visitId={visit?._id} />
        </TabsContent>

        {/* Medication Tab */}
        <TabsContent value="medication">
          <Medications
            visitId={visit?._id}
            patientId={visit?.patient_id?._id}
          />
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes">
          <Notes visitId={visit?._id} />
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices">
          <Invoices visitId={visit?._id} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default VisitWrapper;
