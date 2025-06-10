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
import AddDiagnosisForm from "./add-diagnosis";
import { useEffect, useState } from "react";
import { Diagnosis as DiagnosisType } from "@/types/data";
import { DIAGNOSIS_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { format } from "date-fns";

type Props = {
  visitId: string;
};
const Diagnosis = ({ visitId }: Props) => {
  const [diagnoses, setDiagnoses] = useState<DiagnosisType[] | undefined>(
    undefined
  );
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setFetchingData(true);
      try {
        const data = await getData(`${DIAGNOSIS_ENDPOINT}visit/${visitId}`);
        setDiagnoses(data);
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
            <CardTitle>Diagnosis</CardTitle>
            <CardDescription className="mt-2">
              Conditions diagnosed during this visit
            </CardDescription>
          </div>
          <AddDiagnosisForm visitId={visitId} />
        </div>
      </CardHeader>
      <CardContent>
        {diagnoses && diagnoses.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {diagnoses.map((diagnosis, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {diagnosis?.diagnosis || ""}
                  </TableCell>
                  <TableCell> {diagnosis?.code || ""}</TableCell>
                  <TableCell> {diagnosis?.type || ""}</TableCell>
                  <TableCell>
                    {" "}
                    {format(diagnosis?.date, "yyyy-MM-dd") || ""}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={`${
                        diagnosis?.status === "Active" ? "success" : "secondary"
                      }`}
                    >
                      {diagnosis?.status || ""}
                    </Badge>{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No diagnoses recorded.
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          View History
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Diagnosis;
