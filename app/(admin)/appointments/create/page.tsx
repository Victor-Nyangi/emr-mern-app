import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import AddAppointment from "@/components/appointments/add-appointment";

export default function NewAppointment() {
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-teal-700">
              Setup Appointment
            </h2>
            <p className="text-sm text-muted-foreground">
              Create a new appointment
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild variant="blue">
              <Link href="/appointments">Back</Link>
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <AddAppointment />
      </div>
    </>
  );
}
