import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { BILLINGS_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { columns as billingColumns } from "@/components/billing/columns";
import { List } from "@/components/shared/List";

export default async function Page() {
  const invoices = await getData(BILLINGS_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Billings!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of Invoices
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/billings/create">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Create Billing
              </Link>
            </Button>
          </div>
        </div>

        <List columns={billingColumns} data={invoices} filter_key="patient_name"/>
      </div>
    </>
  );
}
