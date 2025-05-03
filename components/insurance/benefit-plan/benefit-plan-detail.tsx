"use client";

import { useState } from "react";
import { AlertCircle, FlaskRoundIcon as Flask, Pill } from "lucide-react";

import {
  DetailPage,
  type DetailSection,
} from "@/components/detail/detail-page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BenefitPlan } from "@/types/data";

type Props = {
  benefit_plan: BenefitPlan;
};
export default function BenefitPlanSection({ benefit_plan }: Props) {
  console.log(benefit_plan, "bnefit_plan");
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
      title: "Exclustions",
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Form</TableHead>
              <TableHead>Strength</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Typical Dosage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Tablet</TableCell>
              <TableCell>5 mg</TableCell>
              <TableCell>Oral</TableCell>
              <TableCell>5-40 mg once daily</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tablet</TableCell>
              <TableCell>10 mg</TableCell>
              <TableCell>Oral</TableCell>
              <TableCell>5-40 mg once daily</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tablet</TableCell>
              <TableCell>20 mg</TableCell>
              <TableCell>Oral</TableCell>
              <TableCell>5-40 mg once daily</TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
        subtitle={`Insurer: ${benefit_plan?.insurerId?.name} , Covergae Type: ${benefit_plan?.coverageType}`}
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
