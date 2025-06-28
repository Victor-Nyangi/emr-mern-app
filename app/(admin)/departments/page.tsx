import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { DEPARTMENTS_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";

import { Department } from "@/types/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateFn } from "@/lib/utils";

export default async function Page() {
  const departments = await getData(DEPARTMENTS_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Departments!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of departments
            </p>
          </div>
          <div className="ml-auto">
            <Button asChild>
              <Link href="/departments/create">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Create Department
              </Link>
            </Button>
          </div>
        </div>
        {departments.length ? (
          <div className="*:data-[slot=card]:shadow-xs grid grid-cols-2 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
            {departments.map((department: Department) => (
              <Card className="@container/card" key={department._id}>
                <CardHeader className="relative">
                  <CardTitle className="@[250px]/card:text-2xl text-xl font-semibold tabular-nums">
                    {department.name}
                  </CardTitle>
                  <div className="absolute right-4 top-4">
                    <Badge
                      variant="outline"
                      className="flex gap-1 rounded-lg text-xs"
                    >
                      {`Created on: ${formatDateFn(department?.updated_date)}`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                  <div className="line-clamp-1 flex gap-2 font-medium">
                    {department?.description}
                  </div>
                  <div className="text-muted-foreground">
                    <Link
                      className={buttonVariants({ variant: "outline" })}
                      href={`/departments/${department._id}`}
                    >
                      View Department
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No departments found.
          </div>
        )}
      </div>
    </>
  );
}
