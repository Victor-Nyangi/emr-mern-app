import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
// import AddVisit from "@/components/visits/add-visit";

export default function NewVisit() {
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Register Visit
            </h2>
            <p className="text-sm text-muted-foreground">
              Start a new visit
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/visits">Back</Link>
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        {/* <AddVisit /> */}
      </div>
    </>
  );
};
