"use client";

import { useState } from "react";
import {
  AlertCircle,
  FileText,
  FlaskRoundIcon as Flask,
  Pill,
  ShieldAlert,
} from "lucide-react";

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
import { useRouter } from "next/navigation";

type Props = {
  drug: any;
};
export default function DrugDetailPage({ drug }: Props) {
  console.log(drug, "drug detail page");
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  // Define sections for the detail page
  const sections: DetailSection[] = [
    {
      title: "General Information",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drug?.genericName && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Generic Name
              </h3>
              <p>{drug.genericName}</p>
            </div>
          )}
          {drug?.brandNames?.length && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Brand Names
              </h3>
              <p>{drug.brandNames.join(", ")}</p>
            </div>
          )}
          {drug?.category && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Category
              </h3>
              <p>{drug.category}</p>
            </div>
          )}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Drug ID
            </h3>
            <p>{drug._id}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Dosage Information",
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
    {
      title: "Indications",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Treatment of hypertension (high blood pressure)</li>
          <li>Management of heart failure</li>
          <li>Treatment after a heart attack (myocardial infarction)</li>
          <li>Prevention of kidney problems in diabetes patients</li>
        </ul>
      ),
    },
    {
      title: "Side Effects",
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Common Side Effects</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Dizziness</li>
              <li>Headache</li>
              <li>Dry cough</li>
              <li>Fatigue</li>
              <li>Nausea</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Serious Side Effects</h3>
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Swelling of face, lips, tongue, or throat</li>
                  <li>Difficulty breathing or swallowing</li>
                  <li>Severe dizziness</li>
                  <li>Fainting</li>
                  <li>High potassium levels in the blood</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      ),
    },
    {
      title: "Contraindications",
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li>
            History of angioedema related to previous ACE inhibitor therapy
          </li>
          <li>Hereditary or idiopathic angioedema</li>
          <li>Pregnancy (2nd and 3rd trimesters)</li>
          <li>Concomitant use with aliskiren in patients with diabetes</li>
        </ul>
      ),
    },
  ];

  return (
    <>
      {showAlert && (
        <Alert className="max-w-5xl mx-auto mt-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            This is a demonstration of the action buttons. In a real
            application, these would perform actual operations.
          </AlertDescription>
        </Alert>
      )}

      <DetailPage
        id={drug._id}
        name={drug.name}
        subtitle={drug.category}
        status={drug.status}
        createdAt={drug.createdAt}
        updatedAt={drug.updatedAt}
        description={drug.description}
        sections={sections}
        primaryActions={[
          {
            label: "Prescribe",
            icon: <Pill className="h-4 w-4" />,
            onClick: () => {
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 3000);
            },
          },
        ]}
        secondaryActions={[
          {
            label: "View Interactions",
            icon: <Flask className="h-4 w-4" />,
            onClick: () => {
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 3000);
            },
          },
          {
            label: "View Full Monograph",
            icon: <FileText className="h-4 w-4" />,
            onClick: () => {
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 3000);
            },
          },
        ]}
        onEdit={() => {
          router.push(`/drugs/${drug._id}/edit`);
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
