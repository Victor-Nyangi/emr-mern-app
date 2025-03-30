import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { MEMBERS_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { List } from "@/components/shared/List";
import { columns as memberColumns } from "@/components/members/columns";

export default async function Page() {
  const members = await getData(MEMBERS_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Members!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of members
            </p>
          </div>
          <div className="ml-auto mr-4">
            <Button asChild>
              <Link href="/members/create">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Add Patient
              </Link>
            </Button>
          </div>
        </div>

        <List columns={memberColumns} data={members} filter_key="first_name"/>
      </div>
    </>
  );
}
