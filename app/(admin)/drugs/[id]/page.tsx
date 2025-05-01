import DrugDetailPage from "@/components/drugs/drug-detail";
import VisitWrapper from "@/components/visits/wrapper";
import { DRUGS_ENDPOINT, VISITS_ENDPOINT } from "@/utilities/endpoints";

const getDrugData = (id: string) => {
  return {
    id: "MED-12345",
    name: "Lisinopril",
    genericName: "Lisinopril",
    brandNames: ["Prinivil", "Zestril"],
    category: "ACE Inhibitor",
    status: "Active",
    description:
      "Used to treat high blood pressure (hypertension) and heart failure.",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-03-22"),
  };
};

export default async function DrugsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsResponse = await params;
  const drug2 = await getDrugData(`${DRUGS_ENDPOINT}${paramsResponse?.id}/`);
  const drug = getDrugData(params["id"]);
  return (
    <div
      className="container mx-auto
    "
    >
      <div className="flex flex-col space-y-6">
        <DrugDetailPage drug={drug} />
      </div>
    </div>
  );
}
