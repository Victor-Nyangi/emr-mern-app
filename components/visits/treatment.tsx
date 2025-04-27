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

type Props = {
  visit: any;
};
const Treatment = ({ visit }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Treatment Plan</CardTitle>
        <CardDescription>
          Procedures and treatments for this visit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Treatment</h3>
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
                <TableRow>
                  <TableCell className="font-medium">
                    Cardiac Examination
                  </TableCell>
                  <TableCell>{visit.date}</TableCell>
                  <TableCell>{visit.doctor}</TableCell>
                  <TableCell>
                    <Badge variant="outline">Completed</Badge>
                  </TableCell>
                  <TableCell>Normal heart sounds, no murmurs</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ECG</TableCell>
                  <TableCell>{visit.date}</TableCell>
                  <TableCell>Technician: John Smith</TableCell>
                  <TableCell>
                    <Badge variant="outline">Completed</Badge>
                  </TableCell>
                  <TableCell>Normal sinus rhythm</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Recommended Treatment
            </h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Lifestyle Modifications</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Dietary changes and exercise regimen to manage
                      hypertension and diabetes
                    </p>
                  </div>
                  <Badge>High Priority</Badge>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium mb-1">Progress</div>
                  <div className="flex items-center gap-4">
                    <Progress value={30} className="h-2 flex-1" />
                    <span className="text-sm">30%</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Cardiac Rehabilitation</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Recommended 12-week program to improve cardiovascular
                      health
                    </p>
                  </div>
                  <Badge variant="outline">Scheduled</Badge>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium mb-1">Start Date</div>
                  <div className="text-sm">May 15, 2025</div>
                </div>
              </div>
            </div>
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
