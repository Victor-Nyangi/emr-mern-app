"use client";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getData } from "@/utilities/api";
import { PATIENTS_ENDPOINT, VITALS_ENDPOINT } from "@/utilities/endpoints";
import { ReactQueryProvider } from "@/wrappers/query-provider";
import ClientPatientDetailPage from "./patient-detail";

export default async function PatientDetailPageWrapper({
  patientId,
}: {
  patientId: string;
}) {
  const queryClient = new QueryClient();

  await Promise.all([
    await queryClient.prefetchQuery({
      queryKey: ["patient", patientId],
      queryFn: () => getData(`${PATIENTS_ENDPOINT}${patientId}/`),
    }),

    await queryClient.prefetchQuery({
      queryKey: ["policies", patientId],
      queryFn: () => getData(`${PATIENTS_ENDPOINT}${patientId}/policies`),
    }),
    queryClient.prefetchQuery({
      queryKey: ["appointments", patientId],
      queryFn: () => getData(`${PATIENTS_ENDPOINT}${patientId}/appointments`),
    }),
    queryClient.prefetchQuery({
      queryKey: ["clinical-notes", patientId],
      queryFn: () => getData(`${PATIENTS_ENDPOINT}${patientId}/clinical-notes`),
    }),
    queryClient.prefetchQuery({
      queryKey: ["vitals", patientId],
      queryFn: () => getData(`${VITALS_ENDPOINT}patient/${patientId}`),
    }),
  ]);

  return (
    <ReactQueryProvider dehydratedState={dehydrate(queryClient)}>
      <ClientPatientDetailPage patientId={patientId} />
    </ReactQueryProvider>
  );
}
