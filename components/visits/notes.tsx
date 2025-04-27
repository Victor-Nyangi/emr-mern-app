import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

interface Props {
  visit: any;
}
const Notes = ({ visit }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinical Notes</CardTitle>
        <CardDescription>Doctor's notes and observations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium">{visit.doctor}</div>
              <div className="text-sm text-muted-foreground">
                {visit.date}, {visit.time}
              </div>
            </div>
            <p className="text-sm">
              Patient presents for follow-up of hypertension and diabetes.
              Reports improved adherence to medication regimen. Blood pressure
              is better controlled compared to previous visit. Patient reports
              occasional mild headaches but otherwise feeling well. Discussed
              importance of dietary modifications and regular exercise. Patient
              has been monitoring blood glucose levels at home with readings in
              target range.
            </p>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Assessment</h4>
              <ol className="list-decimal list-inside text-sm space-y-1 pl-4">
                <li>Essential hypertension - improved control</li>
                <li>Type 2 diabetes mellitus - stable</li>
                <li>Hyperlipidemia - pending new lab results</li>
              </ol>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Plan</h4>
              <ol className="list-decimal list-inside text-sm space-y-1 pl-4">
                <li>Continue current medications</li>
                <li>Add Amlodipine 5mg daily for better BP control</li>
                <li>Follow up in 3 months</li>
                <li>Complete lab work prior to next visit</li>
                <li>Referral to nutritionist for dietary counseling</li>
              </ol>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium">
                Dr. Michael Chen (Endocrinology)
              </div>
              <div className="text-sm text-muted-foreground">
                March 15, 2025, 2:00 PM
              </div>
            </div>
            <p className="text-sm">
              Patient seen for diabetes management. HbA1c improved from 7.8% to
              7.2%. Patient reports better compliance with medication and diet.
              Discussed importance of regular foot examinations and eye
              check-ups. No signs of diabetic neuropathy or retinopathy at this
              time.
            </p>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Plan</h4>
              <ol className="list-decimal list-inside text-sm space-y-1 pl-4">
                <li>Continue Metformin 500mg twice daily</li>
                <li>Schedule annual eye examination</li>
                <li>Follow up in 6 months</li>
              </ol>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          View All Notes
        </Button>
        <Button size="sm">Add Note</Button>
      </CardFooter>
    </Card>
  );
};

export default Notes;
