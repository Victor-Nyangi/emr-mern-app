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
import AddVitalForm from "./add-vital";
import { useEffect, useState } from "react";
import { Vital } from "@/types/data";
import { VITALS_ENDPOINT, VITAL_DEFINITIONS_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { classifyVitalsForUI } from "@/lib/vitalClassification";
import { VitalDefinition, VitalUIResult } from "@/types/vitals";

const Vitals = ({
  visitId,
  patientId,
}: {
  visitId: string;
  patientId: string;
}) => {
  const [vitals, setVitals] = useState<Vital | undefined>(undefined);
  const [refinedVitals, setRefinedVitals] = useState<VitalUIResult[]>([]);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setFetchingData(true);
      try {
        const [data, definitions]: [Vital, VitalDefinition[]] =
          await Promise.all([
            getData(`${VITALS_ENDPOINT}visit/${visitId}`),
            getData(VITAL_DEFINITIONS_ENDPOINT),
          ]);
        setVitals(data);
        if (data) {
          setRefinedVitals(classifyVitalsForUI(data, definitions));
        }
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
            <CardTitle>Vital Signs</CardTitle>
            <CardDescription className="mt-2">
              Patient's vital measurements during this visit
            </CardDescription>
          </div>
          <AddVitalForm visitId={visitId} patientId={patientId} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {refinedVitals.length > 0 &&
            refinedVitals.map((vital, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{vital.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{vital.value}</div>
                  <Badge variant={vital.color} className="mt-2">
                    {vital.range}
                  </Badge>
                </CardContent>
              </Card>
            ))}

          {vitals?.health_status && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Health Status</CardTitle>
              </CardHeader>
              <CardContent>
                {vitals?.overall_status && (
                  <div className="mt-2">
                    <span>Overall Status:</span>
                    <span className="font-semibold">
                      {" "}
                      {vitals.overall_status}
                    </span>
                  </div>
                )}
                {vitals.blood_glucose && (
                  <div className="mt-2">
                    <span>Glucose Levels:</span>
                    <span className="font-semibold">
                      {" "}
                      {vitals.blood_glucose}
                    </span>
                  </div>
                )}

                <Badge className="mt-2">{vitals.health_status}</Badge>
              </CardContent>
            </Card>
          )}
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
