import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import AddDepartment from "@/components/departments/add-department";

export default function NewDepartment() {
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-teal-700">
              Add New Department
            </h2>
            <p className="text-sm text-muted-foreground">
              Create a new department
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild variant="blue">
              <Link href="/departments">Back</Link>
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <AddDepartment />
      </div>
    </>
  );
} 