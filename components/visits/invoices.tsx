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
import { useEffect, useMemo, useState } from "react";
import { Invoice as InvoiceType } from "@/types/data";
import { format } from "date-fns";
import AddInvoiceForm from "./add-invoice";

type Props = {
  visitId: string;
};
const Invoices = ({ visitId }: Props) => {
  const [totals, setTotals] = useState<{
    totalAmount: number;
    totalCopay: number;
    totalUnpaid: number;
  }>({ totalAmount: 0, totalCopay: 0 , totalUnpaid: 0});
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);
  const [fetchingData, setFetchingData] = useState(true);

  const netPayable = useMemo(() => {
    return (totals.totalAmount - totals.totalCopay).toFixed(2);
  }, [totals.totalAmount, totals.totalCopay]);

  useEffect(() => {
    const fetchData = async () => {
      setFetchingData(true);
      try {
        const data = await getData(`${VISIT_INVOICE_ENDPOINT}visit/${visitId}`);
        setInvoices(data?.invoices);
        setTotals(data?.totals);
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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Invoices</CardTitle>
            <CardDescription className="mt-2">
              Billing information for this visit
            </CardDescription>
          </div>
          <AddInvoiceForm visitId={visitId} />
        </div>
      </CardHeader>
      <CardContent>
        {
          totals.totalUnpaid > 0 &&
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Due</AlertTitle>
          <AlertDescription>
            {`There is an outstanding balance of $${totals.totalUnpaid} for this visit.`}
          </AlertDescription>
        </Alert>
        }

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
            {invoices && invoices?.length > 0 ? (
              <>
                {invoices.map((invoice, index) => (
                  <TableRow key={index}>
                    <TableCell>{invoice?.invoiceNumber}</TableCell>
                    <TableCell>
                      {format(invoice?.createdAt, "yyyy-MM-dd") || ""}
                    </TableCell>
                    <TableCell>{invoice.description}</TableCell>
                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          invoice.status === "PAID"
                            ? "success"
                            : invoice.status === "UNPAID"
                            ? "warning"
                            : "secondary"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No invoices found for this visit.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-2">Payment Summary</h4>
          <div className="space-y-2">
            {totals.totalAmount > 0 && (
              <div className="flex justify-between">
                <span>Total Amount</span>
                <span>${totals.totalAmount.toFixed(2)}</span>
              </div>
            )}
            {totals.totalCopay > 0 && (
              <div className="flex justify-between">
                <span>Total Copay</span>
                <span>${totals.totalCopay.toFixed(2)}</span>
              </div>
            )}
            <Separator />
            {totals.totalCopay > 0 && (
              <div className="flex justify-between font-bold">
                <span>Patient Responsibility</span>
                <span>${netPayable}</span>
              </div>
            )}
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
