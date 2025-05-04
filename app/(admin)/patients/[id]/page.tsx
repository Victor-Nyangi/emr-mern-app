import { getData } from "@/utilities/api";
import { PATIENTS_ENDPOINT } from "@/utilities/endpoints";
import { ChevronLeftIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { columns as policyColumns } from "@/components/insurance/policy/columns";
import { List } from "@/components/shared/List";
import PatientBanner from "@/components/patients/patient-banner";

const getPatientData = (_id: string) => {
  return {
    _id,
    salutation: "Mrs",
    first_name: "Faith",
    last_name: "Kers",
    date_of_birth: "May 15, 1985",
    gender: "Female",
    phone_number: "(555) 123-4567",
    address: "123 Main Street, Anytown, CA 94123",
    email: "sarah.johnson@example.com",
    emergency_contact: "348923-1",
    blood_group: "O+",
    allergies: ["Penicillin", "Peanuts"],
    underlying_conditions: ["Hypertension", "Asthma"],
    is_active: true,
    updated_date: new Date("2022-03-27T19:33:13.679Z"),
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { name: "Albuterol", dosage: "90mcg", frequency: "As needed" },
    ],
  };
};

export default async function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsResponse = await params;
  const patientId = paramsResponse?.id;
  const patient2 = await getData(`${PATIENTS_ENDPOINT}${patientId}/`);
  const patient = getPatientData(params["id"]);

  const policies = await getData(`${PATIENTS_ENDPOINT}${patientId}/policies`);
  console.log(policies, "policies");
  console.log(patient2, "patient2");

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
