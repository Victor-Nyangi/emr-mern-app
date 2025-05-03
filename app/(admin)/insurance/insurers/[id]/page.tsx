import React from "react";
import { getData } from "@/utilities/api";
import { INSURERS_ENDPOINT } from "@/utilities/endpoints";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

import InsurerDetailSection from "@/components/insurance/insurer/insurer-detail";

export default async function InsurerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsResponse = await params;
  const data = await getData(`${INSURERS_ENDPOINT}${paramsResponse?.id}/`);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Link
          className="text-active cursor-pointer text-sm w-fit flex gap-1 items-center  hover:text-green-400"
          href="/insurance/insurers"
        >
          <ChevronLeftIcon /> back
        </Link>{" "}
        <InsurerDetailSection
          insurer={data?.insurer}
          benefit_plans={data?.benefit_plans}
        />
      </div>
    </>
  );
}
