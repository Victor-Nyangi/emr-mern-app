import AddDrug from "@/components/drugs/add-drug";
import { Button } from "@/components/ui/button";
import { getData } from "@/utilities/api";
import { DRUGS_ENDPOINT } from "@/utilities/endpoints";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

export default async function DrugsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsResponse = await params;
  const drug = await getData(`${DRUGS_ENDPOINT}${paramsResponse?.id}/`);
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="space-between flex items-center space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-green-700">
              {drug?.name}
            </h2>
            <p className="text-sm text-muted-foreground">Edit drug</p>
          </div>
          <div className="ml-auto">
            <Button asChild variant="blue">
              <Link href={`/drugs/${drug._id}`}>Back</Link>
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <AddDrug drug={drug} />
      </div>
    </>
  );
}
