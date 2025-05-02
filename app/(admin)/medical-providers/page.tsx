import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { MEDICAL_PROVIDERS_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { List } from "@/components/shared/List";
import { columns as medProviderColumns } from "@/components/medical_providers/columns";

export default async function Page() {
  const medicalProviders = await getData(MEDICAL_PROVIDERS_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Medical providers!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of medical providers
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/medical_providers/create">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Add Medical Provider
              </Link>
            </Button>
          </div>
        </div>

        <List
          columns={medProviderColumns}
          data={medicalProviders}
          filter_key="first_name"
        />
      </div>
    </>
  );
}
