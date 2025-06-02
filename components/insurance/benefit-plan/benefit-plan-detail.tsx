"use client";

import { useState } from "react";
import { AlertCircle, FlaskRoundIcon as Flask, Pill } from "lucide-react";

import {
  DetailPage,
  type DetailSection,
} from "@/components/detail/detail-page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { BenefitPlan, Policy } from "@/types/data";
import { List } from "@/components/shared/List";
import { columns as policyColumns } from "@/components/insurance/policy/columns";

type Props = {
  benefit_plan: BenefitPlan;
  policies: Policy[];
};
export default function BenefitPlanSection({ benefit_plan, policies }: Props) {
  const [showAlert, setShowAlert] = useState(false);

  // Define sections for the detail page
  const sections: DetailSection[] = [
    {
      title: "Coverage Details",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Inpatient
            </h3>
            <p>{benefit_plan?.coverageDetails?.inpatient}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Outpatient
            </h3>
            <p>{benefit_plan?.coverageDetails?.outpatient}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Dental
            </h3>
            <p>{benefit_plan?.coverageDetails?.dental}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Cost Sharing",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
            <p>{benefit_plan?.costSharing?.deductible}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
            <p>{`${benefit_plan?.costSharing?.copay}%`}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
            <p>{`${benefit_plan?.costSharing?.coinsurance}%`}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Covered Services",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          {benefit_plan?.coveredServices.map((service) => (
            <li>{service}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Exclusions",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          {benefit_plan?.exclusions.map((service) => (
            <li>{service}</li>
          ))}
        </ul>
      ),
    },

    {
      title: "Policies",
      content: (
        <List
          columns={policyColumns}
          data={policies}
          filter_key="coverageType"
        />
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
        name={benefit_plan?.name}
        subtitle={`Insurer: ${benefit_plan?.insurerId?.name} , Coverage Type: ${benefit_plan?.coverageType}`}
        createdAt={benefit_plan?.createdAt}
        updatedAt={benefit_plan?.updatedAt}
        description={benefit_plan?.description}
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
