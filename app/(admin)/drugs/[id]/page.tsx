import DrugDetailPage from "@/components/drugs/drug-detail";
import { getData } from "@/utilities/api";
import { DRUGS_ENDPOINT, VISITS_ENDPOINT } from "@/utilities/endpoints";

export default async function DrugsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsResponse = await params;
  const drug = await getData(`${DRUGS_ENDPOINT}${paramsResponse?.id}/`);
  return (
    <div
      className="container mx-auto"
    >
      <div className="flex flex-col p-4">
        <DrugDetailPage drug={drug} />
      </div>
    </div>
  );
}
