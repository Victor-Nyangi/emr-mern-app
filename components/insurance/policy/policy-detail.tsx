"use client";

import { useState } from "react";
import {
  AlertCircle,
  Calendar,
  FlaskRoundIcon as Flask,
  Pill,
} from "lucide-react";

import {
  DetailPage,
  type DetailSection,
} from "@/components/detail/detail-page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Policy } from "@/types/data";
import { format } from "date-fns";

type Props = {
  policy: Policy;
};
export default function PolicyDetailSection({ policy }: Props) {
  const [showAlert, setShowAlert] = useState(false);

  // Define sections for the detail page
  const sections: DetailSection[] = [
    {
      title: "Policy Details",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Benefit Plan
            </h3>
            <p>{policy?.benefitPlanId?.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Insurer
            </h3>
            <p>{policy?.benefitPlanId?.insurerId?.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Effective Date
            </h3>
            {policy?.effectiveDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(policy?.effectiveDate, "PPP")}</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Expiry Date
            </h3>
            {policy?.expiryDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(policy?.expiryDate, "PPP")}</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Coverage Type
            </h3>
            <p>{policy?.coverageType}</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {showAlert && (
        <Alert className="max-w-5xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            This is a demonstration of the action buttons. In a real
            application, these would perform actual operations.
          </AlertDescription>
        </Alert>
      )}

      <DetailPage
        name={`Policy Number: ${policy?.policyNumber}`}
        subtitle={`Member ID: ${policy?.memberId}`}
        createdAt={policy?.createdAt}
        updatedAt={policy?.updatedAt}
        description={`Patient: ${policy?.patientId?.first_name} ${policy?.patientId?.last_name}`}
        sections={sections}
        primaryActions={[
          {
            label: "Update",
            icon: <Pill className="h-4 w-4" />,
            onClick: () => {
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 3000);
            },
          },
        ]}
        secondaryActions={[
          {
            label: "Deactivate",
            icon: <Flask className="h-4 w-4" />,
            onClick: () => {
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 3000);
            },
          },
        ]}
        onEdit={() => {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        }}
        onDelete={() => {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        }}
        onPrint={() => {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        }}
        onShare={() => {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        }}
      />
    </>
  );
}
