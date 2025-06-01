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
  VISIT_TREATMENT_ENDPOINT,
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

const treatmentTypeEnum = [
  "Procedure",
  "Periodic",
  "Wholesome",
  "Other",
] as const;

const treatmentStatusEnum = [
  "Scheduled",
  "Ongoing",
  "Completed",
  "Cancelled",
] as const;
const treatmentPriorityEnum = ["Low", "Medium", "High", "Urgent"] as const;

// Zod schema
const treatmentFormSchema = z.object({
  name: z.string().min(1, "Treatment name is required"),
  type: z.enum(treatmentTypeEnum).default("Procedure"),
  startDate: z.coerce.date({ required_error: "Start date is required" }),
  endDate: z.coerce.date({ required_error: "End date is required" }),
  medicalProvider_id: z.string().min(1, "Medical Provider ID is required"),
  status: z.enum(treatmentStatusEnum).default("Scheduled"),
  notes: z.string().optional(),
  isRecommended: z.boolean().default(false),
  progress: z
    .number()
    .min(0, "Progress must be at least 0%")
    .max(100, "Progress cannot exceed 100%")
    .default(0),
  priority: z.enum(treatmentPriorityEnum).default("Medium"),
});

type treatmentFormValues = z.infer<typeof treatmentFormSchema>;

const defaultValues: Partial<treatmentFormValues> = {
  name: "",
  type: "Procedure",
  startDate: new Date(),
  endDate: new Date(),
  medicalProvider_id: "",
  status: "Scheduled",
  notes: "",
  isRecommended: false,
  progress: 0,
  priority: "Medium",
};

const AddTreatmentForm = ({ visitId }: { visitId: string }) => {
  const [medicalProviders, setMedicalProvidiers] = useState<MedicalProvider[]>(
    []
  );
  const [fetchingData, setFetchingData] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<treatmentFormValues>({
    resolver: zodResolver(treatmentFormSchema),
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

  const onSubmit = async (data: treatmentFormValues) => {
    const payload = {
      ...data,
      visitId: visitId,
    };
    try {
      const response = await postData(VISIT_TREATMENT_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Treatment Successfully created");
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
        actionLabel="Add Treatment"
        title="Treatments Management"
        description="Add a patient's treatment."
      >
        <div className="sm:px-1 px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-3 gap-4">
                <CustomFormField
                  control={form.control}
                  name="name"
                  label="Treatment Name"
                  placeholder="Enter treatment name"
                />
                <FormSelectPopover
                  control={form.control}
                  name="type"
                  label="Type"
                  placeholder="Select Treatment Type"
                  items={treatmentTypeEnum.map((type) => ({
                    label: type,
                    value: type,
                  }))}
                  valueKey="value"
                  displayValue={(m) => m.label}
                />
                <FormSelectPopover
                  control={form.control}
                  name="status"
                  label="Status"
                  placeholder="Select Status"
                  items={treatmentStatusEnum.map((status) => ({
                    label: status,
                    value: status,
                  }))}
                  valueKey="value"
                  displayValue={(m) => m.label}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormSelectPopover
                  control={form.control}
                  name="priority"
                  label="Priority"
                  placeholder="Select Priority"
                  items={treatmentPriorityEnum.map((priority) => ({
                    label: priority,
                    value: priority,
                  }))}
                  valueKey="value"
                  displayValue={(m) => m.label}
                />
                <CustomDateField
                  control={form.control}
                  name="startDate"
                  label="Treatment Start Date"
                  placeholder="Pick a Date"
                />
                <CustomDateField
                  control={form.control}
                  name="endDate"
                  label="Treatment End Date"
                  placeholder="Pick a Date"
                />
              </div>

              <FormField
                control={form.control}
                name="isRecommended"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id="isRecommended"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="isRecommended">
                        Is this Recommended Treatment?
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                {fetchingData ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  <FormSelectPopover
                    control={form.control}
                    name="medicalProvider_id"
                    label="Medical Provider"
                    placeholder="Select Medical Provider"
                    items={medicalProviders}
                    valueKey="_id"
                    displayValue={(m) => constructUserName(m)}
                  />
                )}
                <CustomFormField
                  control={form.control}
                  name="progress"
                  label="Progress"
                  placeholder="Progress in percentage"
                  type="number"
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the benefit plan"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Doctor's Note</FormDescription>
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
                  Add Treatment
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </ResponsiveDialog>
    </>
  );
};

export default AddTreatmentForm;
