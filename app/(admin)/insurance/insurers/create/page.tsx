import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import AddInsurer from "@/components/insurance/insurer/add-insurer";

export default function NewInsurer() {
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Setup Insurer
            </h2>
            <p className="text-sm text-muted-foreground">
              Create a new insurer
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/insurance/insurers">Back</Link>
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <AddInsurer />
      </div>
    </>
  );
};
