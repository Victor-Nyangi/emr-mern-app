import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { getData } from "@/utilities/api";
import {
  DEPARTMENTS_ENDPOINT,
  MEDICAL_PROVIDERS_ENDPOINT,
} from "@/utilities/endpoints";
import AddMedicalProvider from "@/components/medical_providers/add-medical-provider";

export default async function NewQueue({ params }: { params: { id: string } }) {

  const res = await params;
  const id = res?.id;
  const medicalProvider: any = await getData(`${MEDICAL_PROVIDERS_ENDPOINT}/${id}`);
  const departments = await getData(DEPARTMENTS_ENDPOINT);


  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {`${medicalProvider.salutation}: ${medicalProvider.first_name} ${medicalProvider.last_name}`}
            </h2>
            <p className="text-sm text-muted-foreground">Edit Queue Details</p>
          </div>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/medical-providers">Back</Link>
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <AddMedicalProvider
          medicalProvider={medicalProvider}
          departments={departments}
        />
      </div>
    </>
  );
}
