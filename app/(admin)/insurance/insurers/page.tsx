import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { INSURERS_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { List } from "@/components/shared/List";
import { columns as insurerColumns } from "@/components/insurance/insurer/columns";

export default async function Page() {
  const insurers = await getData(INSURERS_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Insurers!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of insurers
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild>
              <Link href="insurers/create">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Add Insurer
              </Link>
            </Button>
          </div>
        </div>

        <List columns={insurerColumns} data={insurers} filter_key="panel" />
      </div>
    </>
  );
}
