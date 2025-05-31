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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { VisitMedication } from "@/types/data";
import { MEDICATIONS_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { format } from "date-fns";
import { constructUserName } from "@/lib/utils";
import AddVisitMedicationForm from "./add-visit-medication ";

type Props = {
  visitId: string;
  patientId: string;
};

const medicationStatuses: Record<
  string,
  "success" | "secondary" | "default" | "destructive" | "outline"
> = {
  Active: "success",
  Pending: "secondary",
  Completed: "success",
  Discontinued: "destructive",
};
const Medications = ({ visitId, patientId }: Props) => {
  const [medications, setMedications] = useState<
    | {
        new_medications: VisitMedication[] | undefined;
        current_medications: VisitMedication[] | undefined;
      }
    | undefined
  >(undefined);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setFetchingData(true);
      try {
        const data = await getData(`${MEDICATIONS_ENDPOINT}visit/${visitId}`);
        setMedications(data);
        console.log("Fetched medications:", data);
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
            <CardTitle>Medications</CardTitle>
            <CardDescription className="mt-2">
              Current and prescribed medications
            </CardDescription>
          </div>
          <AddVisitMedicationForm visitId={visitId} patientId={patientId} />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          <>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Current Medications
              </h3>
              {medications?.current_medications &&
              medications?.current_medications.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medications?.current_medications.map(
                      (medication, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {medication?.medication || ""}
                          </TableCell>
                          <TableCell className="font-medium">
                            {medication?.dosage || ""}
                          </TableCell>
                          <TableCell className="font-medium">
                            {medication?.frequency || ""}
                          </TableCell>
                          <TableCell>
                            {" "}
                            {format(medication?.startDate, "yyyy-MM-dd") || ""}
                          </TableCell>
                          <TableCell>
                            {" "}
                            {format(medication?.endDate, "yyyy-MM-dd") || ""}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                medicationStatuses[
                                  medication?.status as keyof typeof medicationStatuses
                                ]
                              }
                            >
                              {medication?.status || ""}
                            </Badge>{" "}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No medications recorded.
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">New Prescriptions</h3>
              {medications?.new_medications &&
              medications?.new_medications.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Prescribed By</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medications?.new_medications.map((medication, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {medication?.medication || ""}
                        </TableCell>
                        <TableCell>{medication?.dosage || ""}</TableCell>
                        <TableCell>{medication?.frequency || ""}</TableCell>
                        <TableCell>{medication?.duration || ""}</TableCell>
                        <TableCell>
                          {constructUserName(medication?.prescribedBy)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              medicationStatuses[
                                medication?.status as keyof typeof medicationStatuses
                              ]
                            }
                          >
                            {medication?.status || ""}
                          </Badge>{" "}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No new prescriptions recorded.
                </div>
              )}
            </div>
          </>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Medication Interactions</AlertTitle>
            <AlertDescription>
              No significant interactions found between current medications.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Medication History
        </Button>
        <Button size="sm">Prescribe Medication</Button>
      </CardFooter>
    </Card>
  );
};

export default Medications;
