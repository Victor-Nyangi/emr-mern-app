"use client";

import { useState } from "react";
import {
  AlertCircle,
  FlaskRoundIcon as Flask,
  Pill,
  PlusCircleIcon,
} from "lucide-react";

import {
  DetailPage,
  type DetailSection,
} from "@/components/detail/detail-page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { columns as benefitPlanColumns } from "@/components/insurance/benefit-plan/columns";

import { BenefitPlan, Insurer } from "@/types/data";
import { List } from "@/components/shared/List";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  insurer: Insurer;
  benefit_plans: BenefitPlan[];
};
export default function InsurerDetailSection({
  insurer,
  benefit_plans,
}: Props) {
  const [showAlert, setShowAlert] = useState(false);
  console.log(benefit_plans, "benefit_plans");

  // Define sections for the detail page
  const sections: DetailSection[] = [
    {
      title: "General Information",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Phone Number
            </h3>
            <p>{insurer?.contact?.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
            <p>{insurer?.contact?.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Category
            </h3>
            <p>{insurer?.contact?.website}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Address
            </h3>
            <p>{insurer?.contact?.address}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Agent",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
            <p>{insurer?.agent?.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
            <p>{insurer?.agent?.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
            <p>{insurer?.agent?.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Benefits",
      content: (
        <section>
          <div className="space-between flex items-center space-y-2">
            <div>
              <p className="text-muted-foreground">
                Here&apos;s a list of benefits
              </p>
            </div>
            <div className="ml-auto">
              <Button asChild>
                <Link
                  href={`/insurance/insurers/${insurer?._id}/add-benefit-plan`}
                >
                  <PlusCircleIcon className="mr-2 h-4 w-4" />
                  Add Benefit
                </Link>
              </Button>
            </div>
          </div>
          <List
            columns={benefitPlanColumns}
            data={benefit_plans}
            filter_key="coverageType"
          />
        </section>
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
        name={insurer?.name}
        subtitle={insurer?.panel}
        status={insurer?.status}
        createdAt={insurer?.createdAt}
        updatedAt={insurer?.updatedAt}
        description={`Payer ID: ${insurer?.payerId}`}
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
            label: "Contact",
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
