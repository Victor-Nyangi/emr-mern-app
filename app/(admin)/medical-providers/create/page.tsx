import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { getData } from "@/utilities/api";
import { DEPARTMENTS_ENDPOINT } from "@/utilities/endpoints";
import AddMedicalProvider from "@/components/medical_providers/add-medical-provider";

export default async function NewMeidcalProvider() {
  const departments = await getData(DEPARTMENTS_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Register Medical Provider
            </h2>
            <p className="text-sm text-muted-foreground">
              Add a new medical provider
            </p>
          </div>
          <div className="ml-auto mr-4">
            <Button asChild>
              <Link href="/medical_providers">Back</Link>
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <AddMedicalProvider departments={departments} />
      </div>
    </>
  );
}
