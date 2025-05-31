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
import { Test as TestType } from "@/types/data";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import { getData } from "@/utilities/api";
import { TESTS_ENDPOINT } from "@/utilities/endpoints";
import { format } from "date-fns";
import AddTestForm from "./add-test";

type Props = {
  visitId: string;
};

const testStatuses: Record<
  string,
  "success" | "secondary" | "default" | "destructive" | "outline"
> = {
  Ordered: "success",
  Pending: "secondary",
  Completed: "success",
  Cancelled: "destructive",
};

const Tests = ({ visitId }: Props) => {
  const [tests, setDiagnoses] = useState<TestType[] | undefined>(undefined);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setFetchingData(true);
      try {
        const data = await getData(`${TESTS_ENDPOINT}visit/${visitId}`);
        setDiagnoses(data);
        console.log("Fetched tests:", data);
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
        <CardTitle>Laboratory Tests</CardTitle>
        <CardDescription className="mt-2">
        Tests ordered and results for this visit
        </CardDescription>
        </div>
          <AddTestForm visitId={visitId} />
        </div>
      </CardHeader>
      <CardContent>
        {tests && tests.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Name</TableHead>
                <TableHead>Date Ordered</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((diagnosis, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {diagnosis?.testName || ""}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {format(diagnosis?.dateOrdered, "yyyy-MM-dd") || ""}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        testStatuses[
                          diagnosis?.status as keyof typeof testStatuses
                        ]
                      }
                    >
                      {diagnosis?.status || ""}
                    </Badge>{" "}
                  </TableCell>
                  <TableCell> {diagnosis?.result || ""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No tests recorded.
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          View All Tests
        </Button>
        <Button size="sm">Order New Test</Button>
      </CardFooter>
    </Card>
  );
};

export default Tests;
