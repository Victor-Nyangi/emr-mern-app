import { BENEFIT_PLAN_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { List } from "@/components/shared/List";
import { columns as benefitPlanColumns } from "@/components/insurance/benefit-plan/columns";

export default async function Page() {
  const benefitPlans = await getData(BENEFIT_PLAN_ENDPOINT);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Benefit Plans!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of benefitPlans
            </p>
          </div>
        </div>

        <List
          columns={benefitPlanColumns}
          data={benefitPlans}
          filter_key="coverageType"
        />
      </div>
    </>
  );
}
