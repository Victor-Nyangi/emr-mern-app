import { POLICY_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { List } from "@/components/shared/List";
import { columns as policyColumns } from "@/components/insurance/policy/columns";

export default async function Page() {
  const policies = await getData(POLICY_ENDPOINT);
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Policies!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of policies
            </p>
          </div>
        </div>

        <List
          columns={policyColumns}
          data={policies}
          filter_key="coverageType"
        />
      </div>
    </>
  );
}
