import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { QUEUES_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { columns as queueColumns } from "@/components/queues/columns";
import { List } from "@/components/shared/List";

export default async function Page() {
  const queues = await getData(QUEUES_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Queues!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of queues
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/queues/create">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Create Queues
              </Link>
            </Button>
          </div>
        </div>

        <List columns={queueColumns} data={queues} filter_key="name" />
      </div>
    </>
  );
}
