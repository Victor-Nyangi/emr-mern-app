import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import AddPolicy from "@/components/insurance/policy/add-policy";
import { BENEFIT_PLAN_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";

export default async function AddBenefitPlanPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsResponse = await params;
  const patientId = paramsResponse?.id;

  const benefitPlans = await getData(BENEFIT_PLAN_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Link
          className="text-active cursor-pointer text-sm w-fit flex gap-1 items-center  hover:text-green-400"
          href={`/patients/${patientId}`}
        >
          <ChevronLeftIcon /> back
        </Link>{" "}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Policy</h2>
          <p className="text-sm text-muted-foreground">
            Add a policy for this patient
          </p>
        </div>
        <AddPolicy patientId={patientId} benefit_plans={benefitPlans} />
      </div>
    </>
  );
}
