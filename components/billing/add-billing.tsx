"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { BILLINGS_ENDPOINT } from "@/utilities/endpoints";
import { postData } from "@/utilities/api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import CustomFormField from "../forms/input";
import { Textarea } from "../ui/textarea";
import { Visit } from "@/types/data";
import FormSelectPopover from "../forms/select";

const billingFormSchema = z.object({
  patient_name: z
    .string()
    .min(2, "Patient name must be at least 2 characters.")
    .max(100),
  visit_id: z.string().min(1, "Visit ID is required."),
  amount: z.number().min(0, "Amount must be a positive number."),
  amountPaid: z
    .number()
    .min(0, "Amount paid must be a positive number.")
    .default(0),
  insuranceProvider: z.string().optional(),
  services_charged: z
    .array(z.string())
    .min(1, "At least one service must be charged."),
  diagnosis: z.string().optional(),
  notes: z.string().optional(),
});

type BillingFormValues = z.infer<typeof billingFormSchema>;

type Props = { visits: Visit[] };

const defaultValues: Partial<BillingFormValues> = {
  patient_name: "",
  visit_id: "",
  amount: 0,
  amountPaid: 0,
  insuranceProvider: "",
  services_charged: [],
  diagnosis: "",
  notes: "",
};

const AddBilling = ({ visits }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<BillingFormValues>({
    resolver: zodResolver(billingFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: BillingFormValues) => {
    setIsLoading(true);

    try {
      const response = await postData(BILLINGS_ENDPOINT, data);
      if (response?._id) {
        toast.success("Billing record successfully created");
        router.push("/billing");
      } else {
        toast.error("Submission Error", {
          description: "Error in submitting request! Please try again.",
        });
      }
      form.reset();
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <CustomFormField
              control={form.control}
              name="patient_name"
              label="Patient Name"
              placeholder="Enter patient name"
            />

            <FormSelectPopover
              control={form.control}
              name="visit_id"
              label="Visit"
              placeholder="Select visit"
              items={visits}
              valueKey="_id"
              displayValue={(d) => d?.patient_id?.first_name || "Unknown"}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomFormField
              control={form.control}
              name="amount"
              label="Total Amount"
              placeholder="Enter total amount"
              type="number"
            />
            <CustomFormField
              control={form.control}
              name="amountPaid"
              label="Amount Paid"
              placeholder="Enter amount paid"
              type="number"
            />
          </div>

          <CustomFormField
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="Enter insurance provider (optional)"
          />

          <CustomFormField
            control={form.control}
            name="diagnosis"
            label="Diagnosis"
            placeholder="Enter diagnosis (optional)"
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Additional billing notes"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Any additional notes about this billing record
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Billing Record
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddBilling;
