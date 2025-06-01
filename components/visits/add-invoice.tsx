"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import {
  VISIT_INVOICE_ENDPOINT,
  MEDICAL_PROVIDERS_ENDPOINT,
} from "@/utilities/endpoints";
import { getData, postData } from "@/utilities/api";
import ResponsiveDialog from "../shared/ResponsiveDrawer";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomFormField from "../forms/input";
import CustomDateField from "../forms/date-picker";
import FormSelectPopover from "../forms/select";
import { Skeleton } from "../ui/skeleton";
import { MedicalProvider } from "@/types/data";
import { constructUserName } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

const paymentModes = [
  "COPAY",
  "INSURANCE",
  "SELF",
] as const;



// Zod schema
const invoiceFormSchema = z.object({
  services_charged: z.array(z.string()).optional(),
  description: z.string().optional(),
  payment_mode: z.enum(paymentModes).optional().default("SELF"),
  amount: z.number({ required_error: "Amount is required" }),
  copayAmount: z.number({ required_error: "Copay Amount is required" }),
  notes: z.string().optional(),
});

type invoiceFormValues = z.infer<typeof invoiceFormSchema>;

const defaultValues: Partial<invoiceFormValues> = {
  services_charged: [],
  payment_mode: "SELF",

  amount: 0,
  copayAmount: 0,

  description: "",
  notes: "",
};

const AddInvoiceForm = ({ visitId }: { visitId: string }) => {
  const [medicalProviders, setMedicalProvidiers] = useState<MedicalProvider[]>(
    []
  );
  const [fetchingData, setFetchingData] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<invoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues,
  });

  useEffect(() => {
    const fetchData = async () => {
      const medicalProviderData = await getData(MEDICAL_PROVIDERS_ENDPOINT);
      setMedicalProvidiers(medicalProviderData || []);
    };
    fetchData().then((data) => {
      setFetchingData(false);
    });
  }, []);

  const onSubmit = async (data: invoiceFormValues) => {
    const payload = {
      ...data,
      visitId: visitId,
    };
    try {
      const response = await postData(VISIT_INVOICE_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Invoice Successfully created");
      } else {
        toast.error("Submission Error", {
          description: "Error submitting request! Please try again.",
        });
      }
    } catch (error) {
      toast.error("Submission Error", {
        description: (error as Error)?.message || "An error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <ResponsiveDialog
        actionLabel="Add Invoice"
        title="Invoices Management"
        description="Add a patient's invoice."
      >
        <div className="sm:px-1 px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
            
                <FormSelectPopover
                  control={form.control}
                  name="payment_mode"
                  label="Payment Mode"
                  placeholder="Select Payment Mode"
                  items={paymentModes.map((mode) => ({
                    label: mode,
                    value: mode,
                  }))}
                  valueKey="value"
                  displayValue={(m) => m.label}
                />
              </div>

          
              <div className="grid grid-cols-2 gap-4">
              <CustomFormField
                  control={form.control}
                  name="amount"
                  label="Amount"
                  placeholder="Enter amount"
                  type="number"
                />
                <CustomFormField
                  control={form.control}
                  name="copayAmount"
                  label="Co-pay AMount"
                  placeholder="Enter Copay amount"
                  type="number"
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the Description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Describe the invoice</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Give more context on the invoice"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Review Notes</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button type="submit" disabled={isLoading} className="ml-auto">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <Save className="mr-2 h-4 w-4" />
                  Add Invoice
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </ResponsiveDialog>
    </>
  );
};

export default AddInvoiceForm;
