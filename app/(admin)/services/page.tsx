import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { SERVICES_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";

import { Service } from "@/types/data";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateFn } from "@/lib/utils";

export default async function Page() {
  const services = await getData(SERVICES_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Services!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of Services
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/services/create">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Create Service
              </Link>
            </Button>
          </div>
        </div>
        <div className="*:data-[slot=card]:shadow-xs grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
          {services.map((service: Service) => (
            <Card className="@container/card" key={service._id}>
              <CardHeader className="relative">
                <CardDescription>
                  <span className="font-bold text-black">{service.name}</span>
                </CardDescription>

                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                  {`Ksh. ${service.charge.toString()}`}
                </CardTitle>
                <div className="absolute right-4 top-4">
                  <Link
                    className={buttonVariants({ variant: "ghost" })}
                    href={`/services/${service._id}`}
                  >
                    View Service
                  </Link>
                </div>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {service?.description}
                </div>
                <div className="text-muted-foreground mt-3 italic">
                  {`Purpose: ${service.main_purpose}`}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
