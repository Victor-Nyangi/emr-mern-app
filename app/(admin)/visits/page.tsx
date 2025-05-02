import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { VISITS_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { List } from "@/components/shared/List";
import { columns as visitColumns } from "@/components/visits/columns";

export default async function Page() {
  const visits = await getData(VISITS_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Visits!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of visits
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/visits/create">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Add Visit
              </Link>
            </Button>
          </div>
        </div>

        <List
          columns={visitColumns}
          data={visits}
          filter_key="payment_method"
        />
      </div>
    </>
  );
}
