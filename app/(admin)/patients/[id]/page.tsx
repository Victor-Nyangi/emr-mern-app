import { getData } from "@/utilities/api";
import { PATIENTS_ENDPOINT } from "@/utilities/endpoints";
import { ChevronLeftIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { columns as policyColumns } from "@/components/insurance/policy/columns";
import { List } from "@/components/shared/List";
import PatientBanner from "@/components/patients/patient-banner";

export default async function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsResponse = await params;
  const patientId = paramsResponse?.id;
  const [patient, policies] = await Promise.all([
    getData(`${PATIENTS_ENDPOINT}${patientId}/`),
    getData(`${PATIENTS_ENDPOINT}${patientId}/policies`),
  ]);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Link
          className="text-active cursor-pointer text-sm w-fit flex gap-1 items-center  hover:text-green-400"
          href="/patients"
        >
          <ChevronLeftIcon /> back
        </Link>{" "}
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

      {/* {status !== "" && <Alert status={status} message={message} />}  */}
    </>
  );
}
