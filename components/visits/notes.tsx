import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { VisitClinicalNote } from "@/types/data";
import { VISIT_CLINICAL_NOTES_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import AddVisitClinicalNoteForm from "./add-visit-note";
import { constructUserName } from "@/lib/utils";

type Props = {
  visitId: string;
};
const Notes = ({ visitId }: Props) => {
  const [notes, setNotes] = useState<VisitClinicalNote[] | undefined>(
    undefined
  );
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setFetchingData(true);
      try {
        const data = await getData(
          `${VISIT_CLINICAL_NOTES_ENDPOINT}visit/${visitId}`
        );
        setNotes(data);
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
        <CardTitle>Clinical Notes</CardTitle>
        <CardDescription>Doctor's notes and observations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {notes?.length ? (
            <>
              {notes.map(
                (
                  { medicalProvider_id, assessment, plan, createdAt, content },
                  index
                ) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">
                        {constructUserName(medicalProvider_id)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <time>{new Date(createdAt).toLocaleDateString()}</time>
                      </div>
                    </div>
                    <p className="text-sm">{content}</p>
                    {assessment?.length > 0 && (
                      <>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">
                            Assessment
                          </h4>
                          <ol className="list-decimal list-inside text-sm space-y-1 pl-4">
                            {assessment.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ol>
                        </div>
                      </>
                    )}
                    {plan?.length && (
                      <>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Plan</h4>
                          <ol className="list-decimal list-inside text-sm space-y-1 pl-4">
                            {plan.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ol>
                        </div>
                      </>
                    )}
                  </div>
                )
              )}
            </>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              No clinical notes recorded.
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          View All Notes
        </Button>
        <AddVisitClinicalNoteForm visitId={visitId} />
      </CardFooter>
    </Card>
  );
};

export default Notes;
