import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon, AlertCircle } from "lucide-react";
import { VISITS_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { List } from "@/components/shared/List";
import { columns as visitColumns } from "@/components/visits/columns";
import { CanReadVisit, CanCreateVisit, AdminOnly } from "@/components/auth/PermissionGuard";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default async function Page() {
  const visits = await getData(VISITS_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-blue-700">Visits!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of visits
            </p>
          </div>
          <div className="ml-auto">
            <CanCreateVisit>
              <Button asChild variant="teal">
                <Link href="/visits/create">
                  <PlusCircleIcon className="mr-2 h-4 w-4" />
                  Add Visit
                </Link>
              </Button>
            </CanCreateVisit>
          </div>
        </div>

        <CanReadVisit>
          <List
            columns={visitColumns}
            data={visits}
            filter_key="payment_method"
          />
        </CanReadVisit>

        <CanReadVisit fallback={
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You don't have permission to view visits. Please contact your administrator.
            </AlertDescription>
          </Alert>
        } showFallback={true}>
          <div className="hidden">This content is only shown if user has permission</div>
        </CanReadVisit>

        <AdminOnly>
          <Alert className="border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Welcome, Administrator! You have full access to all visit data and operations.
            </AlertDescription>
          </Alert>
        </AdminOnly>
      </div>
    </>
  );
}
