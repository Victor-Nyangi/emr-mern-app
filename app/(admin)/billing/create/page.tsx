import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

export default function NewBilling() {
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-green-700">
              Setup Billing
            </h2>
            <p className="text-sm text-muted-foreground">
              Create a new billing record
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild variant="blue">
              <Link href="/billing">Back</Link>
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
      </div>
    </>
  );
}; 