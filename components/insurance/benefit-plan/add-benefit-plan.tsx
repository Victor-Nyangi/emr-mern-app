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
import { postData } from "@/utilities/api";

import { toast } from "sonner";

import CustomFormField from "../../forms/input";
import FormSelectPopover from "../../forms/select";
import { benefitServices, coverageTypes } from "@/lib/data";
import { Separator } from "@radix-ui/react-separator";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import SelectServices from "./select-services";
import { BENEFIT_PLAN_ENDPOINT } from "@/utilities/endpoints";

type Props = { insurerId: string };

// Optional reusable enums
const coverageValues = z.enum(["HMO", "PPO", "EPO", "POS"]);

// Zod schema
const benefitPlanFormSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  description: z.string().optional(),
  coverageType: coverageValues.optional(),
  coverageDetails: z.record(z.any()).optional(), // Flexible key-value structure
  costSharing: z.record(z.any()).optional(),
  outOfPocketMax: z
    .object({
      individual: z.number().optional(),
      family: z.number().optional(),
    })
    .optional(),
  coveredServices: z.array(z.object({ value: z.string() })).optional(),
  exclusions: z.array(z.object({ value: z.string() })).optional(),
});
type benefitPlanFormValues = z.infer<typeof benefitPlanFormSchema>;

const defaultValues: Partial<benefitPlanFormValues> = {
  name: "",
  description: "",
  coverageType: "POS",
  coverageDetails: undefined,
  costSharing: undefined,
  outOfPocketMax: {
    individual: 0,
    family: 0,
  },
  coveredServices: undefined,
  exclusions: undefined,
};

const AddBenefitPlan = ({ insurerId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<benefitPlanFormValues>({
    resolver: zodResolver(benefitPlanFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: benefitPlanFormValues) => {
    try {
      const mappedCoveredServices =
        data?.coveredServices?.map((service) => service.value) ?? [];

      const mappedExclustionServices =
        data?.exclusions?.map((service) => service.value) ?? [];

      const payload = {
        ...data,
        coveredServices: mappedCoveredServices,
        exclusions: mappedExclustionServices,
        insurerId: insurerId,
      };
      console.log(payload, "pauload");
      const response = await postData(BENEFIT_PLAN_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Benefit Plan Successfully created");
        router.push(`/insurance/insurers/${insurerId}`);
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
              name="name"
              label="Name"
              placeholder="Enter name"
            />

            <FormSelectPopover
              control={form.control}
              name="coverageTypes"
              label="Coverage Type"
              placeholder="Select coverage type"
              items={coverageTypes}
              valueKey="value"
              displayValue={(b) => b?.label}
            />
          </div>

          <p className="font-bold">Enter Out of Pocket Max </p>
          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <CustomFormField
              control={form.control}
              name="outOfPocketMax.individual"
              label="Individual"
              placeholder="Individual"
              type="number"
            />
            <CustomFormField
              control={form.control}
              name="outOfPocketMax.family"
              label="Family"
              placeholder="Family"
              type="number"
            />
          </div>
          <p className="font-bold">Enter Coverage Details</p>
          <Separator />

          <div className="grid grid-cols-3 gap-4">
            <CustomFormField
              control={form.control}
              name="coverageDetails.outpatient"
              label="Outpatient Specifications"
              placeholder="Outpatient Specifications"
            />
            <CustomFormField
              control={form.control}
              name="coverageDetails.inpatient"
              label="Inpatient Specifications"
              placeholder="Inpatient Specifications"
            />
            <CustomFormField
              control={form.control}
              name="coverageDetails.dental"
              label="Dental Specifications"
              placeholder="Dental Specifications"
            />
          </div>

          <p className="font-bold">Enter Cost Sharing Details</p>
          <Separator />
          <div className="grid grid-cols-3 gap-4">
            <CustomFormField
              control={form.control}
              name="costSharing.deductible"
              label="Deductible Cost"
              placeholder="Deductible Cost"
              type="number"
            />
            <CustomFormField
              control={form.control}
              name="costSharing.copay"
              label="Percentage Copay"
              placeholder="Copay as a percentage"
              type="number"
            />
            <CustomFormField
              control={form.control}
              name="costSharing.coinsurance"
              label="Percentage Co-Insurance"
              placeholder="Co-Insurance as a percentage"
              type="number"
            />
          </div>

          <SelectServices
            control={form.control}
            benefitServices={benefitServices}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the benefit plan"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>What does the plan offer</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Benefit Plan
          </Button>
        </form>
      </Form>{" "}
    </>
  );
};

export default AddBenefitPlan;
