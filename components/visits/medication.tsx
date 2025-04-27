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

type Props = {
  visit: any;
};

const Medications = ({ visit }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medications</CardTitle>
        <CardDescription>Current and prescribed medications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Medications</h3>
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
                <TableRow>
                  <TableCell className="font-medium">Lisinopril</TableCell>
                  <TableCell>10mg</TableCell>
                  <TableCell>Once daily</TableCell>
                  <TableCell>Jan 15, 2025</TableCell>
                  <TableCell>Ongoing</TableCell>
                  <TableCell>
                    <Badge>Active</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Metformin</TableCell>
                  <TableCell>500mg</TableCell>
                  <TableCell>Twice daily</TableCell>
                  <TableCell>Mar 10, 2025</TableCell>
                  <TableCell>Ongoing</TableCell>
                  <TableCell>
                    <Badge>Active</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Atorvastatin</TableCell>
                  <TableCell>20mg</TableCell>
                  <TableCell>Once daily at bedtime</TableCell>
                  <TableCell>Jan 15, 2025</TableCell>
                  <TableCell>Ongoing</TableCell>
                  <TableCell>
                    <Badge>Active</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">New Prescriptions</h3>
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
                <TableRow>
                  <TableCell className="font-medium">Amlodipine</TableCell>
                  <TableCell>5mg</TableCell>
                  <TableCell>Once daily</TableCell>
                  <TableCell>30 days</TableCell>
                  <TableCell>{visit.doctor}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Pending</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

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
