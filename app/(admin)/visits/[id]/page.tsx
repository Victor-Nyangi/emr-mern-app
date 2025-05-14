import VisitWrapper from "@/components/visits/wrapper";
import { getData } from "@/utilities/api";
import { VISITS_ENDPOINT } from "@/utilities/endpoints";

export default async function VisitDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsResponse = await params;
  const visit = await getData(`${VISITS_ENDPOINT}${paramsResponse?.id}/`);

  return (
    <div className="container mx-auto sm:p-8 p-4">
      <div className="flex flex-col space-y-6">
        <VisitWrapper visit={visit} />
      </div>
    </div>
  );
}
