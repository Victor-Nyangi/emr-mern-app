import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { PATIENTS_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { List } from "@/components/shared/List";
import { columns as patientColumns } from "@/components/patients/columns";

export default async function Page() {
  const patients = await getData(PATIENTS_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Patients!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of patients
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/patients/create">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Add Patient
              </Link>
            </Button>
          </div>
        </div>

        <List columns={patientColumns} data={patients} filter_key="first_name"/>
      </div>
    </>
  );
}
