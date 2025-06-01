import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Progress } from "../ui/progress";
import AddTreatmentForm from "./add-treatment";
import { useEffect, useState } from "react";
import { VISIT_TREATMENT_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { format } from "date-fns";
import { constructUserName } from "@/lib/utils";
import { Treatment as TreatmentType } from "@/types/data";

type Props = {
  visitId: string;
};

const treatmentStatuses: Record<
  string,
  "success" | "secondary" | "default" | "destructive" | "outline"
> = {
  Scheduled: "default",
  Ongoing: "success",
  Completed: "success",
  Cancelled: "destructive",
};

const treatmentPriorities: Record<
  string,
  "success" | "secondary" | "default" | "destructive" | "outline"
> = {
  Low: "secondary",
  Medium: "secondary",
  Urgent: "destructive",
  High: "destructive",
};
const Treatment = ({ visitId }: Props) => {
  const [treatments, setTreatments] = useState<
    | {
        recommended_treatments: TreatmentType[] | undefined;
        current_treatments: TreatmentType[] | undefined;
      }
    | undefined
  >(undefined);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setFetchingData(true);
      try {
        const data = await getData(
          `${VISIT_TREATMENT_ENDPOINT}visit/${visitId}`
        );
        setTreatments(data);
        console.log("Fetched treatments:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, [visitId]);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Treatment Plan</CardTitle>
            <CardDescription className="mt-2">
              Procedures and treatments for this visit
            </CardDescription>
          </div>
          <AddTreatmentForm visitId={visitId} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Treatment</h3>
            {treatments?.current_treatments &&
            treatments?.current_treatments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Procedure</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {treatments?.current_treatments.map((treatment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {treatment?.name || ""}
                      </TableCell>
                      <TableCell className="font-medium">
                        {format(treatment?.startDate, "yyyy-MM-dd") || ""}
                      </TableCell>
                      <TableCell className="font-medium">
                        {constructUserName(treatment?.medicalProvider_id)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            treatmentStatuses[
                              treatment?.status as keyof typeof treatmentStatuses
                            ]
                          }
                        >
                          {treatment?.status || ""}
                        </Badge>{" "}
                      </TableCell>
                      <TableCell>{treatment?.notes || ""}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No treatments recorded.
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Recommended Treatment
            </h3>
            {treatments?.recommended_treatments &&
            treatments?.recommended_treatments.length > 0 ? (
              <div className="space-y-4">
                {treatments?.recommended_treatments.map((treatment, index) => (
                  <>
                    {treatment?.type === "Wholesome" ? (
                      <div className="border rounded-lg p-4" key={index}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">
                              {" "}
                              {treatment?.name || ""}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {treatment?.notes || ""}
                            </p>
                          </div>
                          <Badge
                            variant={
                              treatmentPriorities[
                                treatment?.priority as keyof typeof treatmentPriorities
                              ]
                            }
                          >
                            {`${treatment?.priority} priority` || ""}
                          </Badge>{" "}
                        </div>
                        <div className="mt-4">
                          <div className="text-sm font-medium mb-1">
                            Progress
                          </div>
                          <div className="flex items-center gap-4">
                            <Progress
                              value={treatment?.progress || 0}
                              className="h-2 flex-1"
                            />
                            <span className="text-sm">
                              {treatment?.progress || 0}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">
                              {treatment?.name || ""}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {treatment?.notes || ""}
                            </p>
                          </div>
                          <Badge
                            variant={
                              treatmentStatuses[
                                treatment?.status as keyof typeof treatmentStatuses
                              ]
                            }
                          >
                            {treatment?.status || ""}
                          </Badge>{" "}
                        </div>
                        <div className="mt-4">
                          <div className="text-sm font-medium mb-1">
                            Start Date
                          </div>
                          <div className="text-sm">
                            {format(treatment?.startDate, "yyyy-MM-dd") || ""}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No treatments recorded.
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Treatment History
        </Button>
        <Button size="sm">Update Plan</Button>
      </CardFooter>
    </Card>
  );
};

export default Treatment;
