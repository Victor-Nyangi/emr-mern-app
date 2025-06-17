import React from "react";
import PatientDetailPageWrapper from "@/components/patients/patient-detail-wrapper";

export default async function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <PatientDetailPageWrapper patientId={params.id} />;
}
