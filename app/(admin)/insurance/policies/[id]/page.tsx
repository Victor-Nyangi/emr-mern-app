import PolicyDetailSection from "@/components/insurance/policy/policy-detail";
import { getData } from "@/utilities/api";
import { POLICY_ENDPOINT } from "@/utilities/endpoints";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function PolicyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsResponse = await params;
  const id = paramsResponse?.id;
  const policy = await getData(`${POLICY_ENDPOINT}${id}/`);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Link
          className="text-active cursor-pointer text-sm w-fit flex gap-1 items-center  hover:text-green-400"
          href="/insurance/policies"
        >
          <ChevronLeftIcon /> back
        </Link>{" "}
        <PolicyDetailSection policy={policy} />
      </div>
    </>
  );
}
