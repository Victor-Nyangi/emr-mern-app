import { getData } from "@/utilities/api";
import { BENEFIT_PLAN_ENDPOINT } from "@/utilities/endpoints";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import BenefitPlanDetailSection from "@/components/insurance/benefit-plan/benefit-plan-detail";

export default async function BenefitPlanDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsResponse = await params;
  const id = paramsResponse?.id;
  const benefit_plan = await getData(
    `${BENEFIT_PLAN_ENDPOINT}${id}/`
  );

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Link
          className="text-active cursor-pointer text-sm w-fit flex gap-1 items-center  hover:text-green-400"
          href="/insurance/benefit-plans"
        >
          <ChevronLeftIcon /> back
        </Link>{" "}
        <BenefitPlanDetailSection benefit_plan={benefit_plan} />
      </div>
    </>
  );
}
