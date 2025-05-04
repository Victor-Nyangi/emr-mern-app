"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { postData } from "@/utilities/api";

import { toast } from "sonner";

import FormSelectPopover from "../../forms/select";
import { Loader2 } from "lucide-react";
import { POLICY_ENDPOINT } from "@/utilities/endpoints";
import { BenefitPlan } from "@/types/data";
import { format } from "date-fns";
import CustomDateField from "@/components/forms/date-picker";

type Props = { patientId: string; benefit_plans: BenefitPlan[] };

const coverageTypes = ["Primary", "Secondary", "Tertiary"] as const;

// Optional reusable enums
const policyFormSchema = z.object({
  benefitPlanId: z.string().min(1, "Benefit Plan ID is required"), // ObjectId as string
  coverageType: z.enum(coverageTypes).default("Primary"),
  effectiveDate: z.coerce.date({
    required_error: "Effective date is required",
    invalid_type_error: "Effective date must be a valid date",
  }),
  expiryDate: z.coerce.date({
    required_error: "Expiry date is required",
    invalid_type_error: "Expiry date must be a valid date",
  }),
});

type policyFormValues = z.infer<typeof policyFormSchema>;

const defaultValues: Partial<policyFormValues> = {
  coverageType: "Primary",
  benefitPlanId: "",
  effectiveDate: undefined,
  expiryDate: undefined,
};

const AddPolicy = ({ patientId, benefit_plans }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<policyFormValues>({
    resolver: zodResolver(policyFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: policyFormValues) => {
    try {
      const payload = {
        ...data,
        patientId: patientId,
        isActive: false,
        effectiveDate: format(
          new Date(data.effectiveDate),
          "yyyy-MM-dd HH:mm:ss.SSSSSS"
        ),
        expiryDate: format(
          new Date(data.expiryDate),
          "yyyy-MM-dd HH:mm:ss.SSSSSS"
        ),
      };
      const response = await postData(POLICY_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Policy Successfully created");
        router.push(`/patients/${patientId}`);
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
            <FormSelectPopover
              control={form.control}
              name="benefitPlanId"
              label="Benefit Plan"
              placeholder="Select benefit plan"
              items={benefit_plans}
              valueKey="_id"
              displayValue={(b) =>
                `Name: ${b?.name}, Insurer: ${b?.insurerId?.name}`
              }
            />

            <FormSelectPopover
              control={form.control}
              name="coverageTypes"
              label="Coverage Type"
              placeholder="Select coverage type"
              items={coverageTypes.map((type) => ({
                label: type,
                value: type,
              }))}
              valueKey="value"
              displayValue={(b) => b?.label}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomDateField
              control={form.control}
              name="effectiveDate."
              label="Effective Date"
              placeholder="Pick a Date"
            />
            <CustomDateField
              control={form.control}
              name="expiryDate."
              label="Expiry Date"
              placeholder="Pick a Date"
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Policy
          </Button>
        </form>
      </Form>{" "}
    </>
  );
};

export default AddPolicy;
