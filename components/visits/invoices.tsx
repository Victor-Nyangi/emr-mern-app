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

import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { VISIT_INVOICE_ENDPOINT } from "@/utilities/endpoints";
import { getData } from "@/utilities/api";
import { useEffect, useState } from "react";
import { Invoice as InvoiceType } from "@/types/data";

type Props = {
  visitId: string;
};
const Invoices = ({ visitId }: Props) => {
  const [invoicesObj, setInvoices] = useState<
    | {
        invoices: InvoiceType[] | undefined;
        totals: { totalAmount: number; totalCopay: number } | undefined;
      }
    | undefined
  >(undefined);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setFetchingData(true);
      try {
        const data = await getData(`${VISIT_INVOICE_ENDPOINT}visit/${visitId}`);
        setInvoices(data);
        console.log("Fetched invoices:", data);
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
        <CardTitle>Invoices</CardTitle>
        <CardDescription>Billing information for this visit</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Due</AlertTitle>
          <AlertDescription>
            There is an outstanding balance of $75.00 for this visit.
          </AlertDescription>
        </Alert>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV-001</TableCell>
              {/* <TableCell>{visit.date}</TableCell> */}
              <TableCell>Office Visit - Cardiology</TableCell>
              <TableCell>$150.00</TableCell>
              <TableCell>
                <Badge variant="secondary">Pending Insurance</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV-002</TableCell>
              {/* <TableCell>{visit.date}</TableCell> */}
              <TableCell>Laboratory Tests</TableCell>
              <TableCell>$225.00</TableCell>
              <TableCell>
                <Badge variant="secondary">Pending Insurance</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV-003</TableCell>
              {/* <TableCell>{visit.date}</TableCell> */}
              <TableCell>Patient Copay</TableCell>
              <TableCell>$75.00</TableCell>
              <TableCell>
                <Badge variant="destructive">Unpaid</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2">Payment Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Charges</span>
              <span>$375.00</span>
            </div>
            <div className="flex justify-between">
              <span>Insurance Pending</span>
              <span>$300.00</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Patient Responsibility</span>
              <span>$75.00</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          View All Invoices
        </Button>
        <Button size="sm">Process Payment</Button>
      </CardFooter>
    </Card>
  );
};

export default Invoices;
