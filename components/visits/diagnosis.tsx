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

type Props = {
  visit_date: string;
};
const Diagnosis = ({ visit_date }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Diagnosis</CardTitle>
        <CardDescription>
          Conditions diagnosed during this visit
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            <TableRow>
              <TableCell className="font-medium">
                Essential Hypertension
              </TableCell>
              <TableCell>I10</TableCell>
              <TableCell>Primary</TableCell>
              <TableCell>{visit_date}</TableCell>
              <TableCell>
                <Badge>Active</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Type 2 Diabetes Mellitus
              </TableCell>
              <TableCell>E11.9</TableCell>
              <TableCell>Secondary</TableCell>
              <TableCell>March 15, 2025</TableCell>
              <TableCell>
                <Badge>Active</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Hyperlipidemia</TableCell>
              <TableCell>E78.5</TableCell>
              <TableCell>Secondary</TableCell>
              <TableCell>January 10, 2025</TableCell>
              <TableCell>
                <Badge>Active</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          View History
        </Button>
        <Button size="sm">Add Diagnosis</Button>
      </CardFooter>
    </Card>
  );
};

export default Diagnosis;
