import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import AddPatient from "@/components/patients/add-patient";

export default function NewPatient() {
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Register Patient
            </h2>
            <p className="text-sm text-muted-foreground">
              Create a new patient
            </p>
          </div>
          <div className="ml-auto mr-4">
            <Button asChild>
              <Link href="/patients">Back</Link>
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <AddPatient />
      </div>
    </>
  );
};
