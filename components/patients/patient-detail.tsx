"use client";

import { useQuery } from "@tanstack/react-query";
import { getData } from "@/utilities/api";
import { PATIENTS_ENDPOINT } from "@/utilities/endpoints";
import { ChevronLeftIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { columns as policyColumns } from "@/components/insurance/policy/columns";
import { List } from "@/components/shared/List";
import PatientBanner from "@/components/patients/patient-banner";
import DetailSkeleton from "../layout/loaders/detail-skeleton-loader";

export default function ClientPatientDetailPage({
  patientId,
}: {
  patientId: string;
}) {
  const { data: patient, isLoading: isPatientLoading } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getData(`${PATIENTS_ENDPOINT}${patientId}/`),
  });

  const { data: policies, isLoading: isPoliciesLoading } = useQuery({
    queryKey: ["policies", patientId],
    queryFn: () => getData(`${PATIENTS_ENDPOINT}${patientId}/policies`),
  });

  if (isPatientLoading || isPoliciesLoading) {
    return <DetailSkeleton />;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <Link
        className="text-active cursor-pointer text-sm w-fit flex gap-1 items-center  hover:text-green-400"
        href="/patients"
      >
        <ChevronLeftIcon /> back
      </Link>
      <PatientBanner patient={patient} />
      {/* Policies Section */}
      <section>
        <div className="space-between flex items-center space-y-2">
          <div>
            <p className="text-muted-foreground">
              Here&apos;s a list of the patient's policies
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild>
              <Link href={`/patients/${patientId}/add-policy`}>
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Add Policy
              </Link>
            </Button>
          </div>
        </div>
        <List
          columns={policyColumns}
          data={policies}
          filter_key="coverageType"
        />
      </section>
    </div>
  );
}
