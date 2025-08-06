import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import AddService from "@/components/services/add-service";

export default function NewService() {
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-green-700">
              Add New Service
            </h2>
            <p className="text-sm text-muted-foreground">
              Create a new service
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild variant="blue">
              <Link href="/services">Back</Link>
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <AddService />
      </div>
    </>
  );
} 