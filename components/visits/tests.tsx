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
  visit: any;
};

const Tests = ({ visit }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Laboratory Tests</CardTitle>
        <CardDescription>
          Tests ordered and results for this visit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Name</TableHead>
              <TableHead>Date Ordered</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Reference Range</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                Complete Blood Count (CBC)
              </TableCell>
              <TableCell>{visit.date}</TableCell>
              <TableCell>
                <Badge variant="outline">Completed</Badge>
              </TableCell>
              <TableCell>Normal</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Lipid Panel</TableCell>
              <TableCell>{visit.date}</TableCell>
              <TableCell>
                <Badge variant="outline">Completed</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="destructive">Abnormal</Badge>
              </TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">HbA1c</TableCell>
              <TableCell>{visit.date}</TableCell>
              <TableCell>
                <Badge variant="secondary">Pending</Badge>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>4.0-5.6%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Comprehensive Metabolic Panel
              </TableCell>
              <TableCell>{visit?.date}</TableCell>
              <TableCell>
                <Badge variant="secondary">Pending</Badge>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
