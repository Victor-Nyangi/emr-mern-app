import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { FINANCIALS_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { columns as financialColumns } from "@/components/financial/columns";
import { List } from "@/components/shared/List";

export default async function Page() {
  const accounts = await getData(FINANCIALS_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Financial!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of User Financial Accounts
            </p>
          </div>
          <div className="ml-auto mr-4">
            <Button asChild>
              <Link href="/financials/create">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Create Account
              </Link>
            </Button>
          </div>
        </div>

        <List columns={financialColumns} data={accounts} filter_key="patient_name"/>
      </div>
    </>
  );
}
