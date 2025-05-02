import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { getData } from "@/utilities/api";
import {
  DEPARTMENTS_ENDPOINT,
  MEDICAL_PROVIDERS_ENDPOINT,
} from "@/utilities/endpoints";
import AddQueue from "@/components/queues/add-queue";

export default async function NewQueue() {
  const departments = await getData(DEPARTMENTS_ENDPOINT);

  const medicalProviders = await getData(MEDICAL_PROVIDERS_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Register Queue
            </h2>
            <p className="text-sm text-muted-foreground">Create a new queue</p>
          </div>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/queues">Back</Link>
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <AddQueue
          departments={departments}
          medicalProviders={medicalProviders}
        />
      </div>
    </>
  );
}
