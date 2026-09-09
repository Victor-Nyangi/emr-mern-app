import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import AddDrug from "@/components/drugs/add-drug";

export default function NewDrug() {
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-green-700">
              Add New Drug
            </h2>
            <p className="text-sm text-muted-foreground">
              Create a new drug record
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild variant="blue">
              <Link href="/drugs">Back</Link>
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <AddDrug />
      </div>
    </>
  );
}
