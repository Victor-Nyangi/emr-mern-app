import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import AddBenefitPlan from "@/components/insurance/benefit-plan/add-benefit-plan";

export default async function AddBenefitPlanPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsResponse = await params;
  const insurerId = paramsResponse?.id;

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Link
          className="text-active cursor-pointer text-sm w-fit flex gap-1 items-center  hover:text-green-400"
          href={`/insurance/insurers/${insurerId}`}
        >
          <ChevronLeftIcon /> back
        </Link>{" "}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Insurance Benefits
          </h2>
          <p className="text-sm text-muted-foreground">
            Add a benefit plan to this insurance
          </p>
        </div>
        <AddBenefitPlan insurerId={insurerId} />
      </div>
    </>
  );
}
