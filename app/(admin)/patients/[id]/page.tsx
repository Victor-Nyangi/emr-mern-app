import React from "react";
import PatientDetailPageWrapper from "@/components/patients/patient-detail-wrapper";

export default async function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await params;
  const id = res?.id;
  return <PatientDetailPageWrapper patientId={id} />;
}
