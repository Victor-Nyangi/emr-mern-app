import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

const Vitals = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vital Signs</CardTitle>
        <CardDescription>
          Patient's vital measurements during this visit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Blood Pressure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">120/80 mmHg</div>
              <Badge className="mt-2">Normal</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Heart Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72 bpm</div>
              <Badge className="mt-2">Normal</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Temperature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.6 °F</div>
              <Badge className="mt-2">Normal</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Respiratory Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16 breaths/min</div>
              <Badge className="mt-2">Normal</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Oxygen Saturation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <Badge className="mt-2">Normal</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Weight</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">180 lbs</div>
              <div className="text-sm text-muted-foreground">
                Previous: 183 lbs
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          View History
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Vitals;
