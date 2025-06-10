"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { frequencyOptions } from "@/lib/data";
import {
  MEDICAL_PROVIDERS_ENDPOINT,
  MEDICATIONS_ENDPOINT,
} from "@/utilities/endpoints";
import { getData, postData } from "@/utilities/api";
import ResponsiveDialog from "../shared/ResponsiveDrawer";
import { MedicalProvider } from "@/types/data";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomDateField from "../forms/date-picker";
import FormSelectPopover from "../forms/select";
import CustomFormField from "../forms/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Skeleton } from "../ui/skeleton";
import { constructUserName } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

const statuses = ["Active", "Completed", "Discontinued", "Pending"] as const;

// Zod schema
const medicationFormSchema = z.object({
  medication: z.string().min(1, "Medication is required"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Medication is required"),
  startDate: z.coerce.date().default(new Date()),
  endDate: z.coerce.date().default(new Date()),
  status: z.enum(statuses).default("Active"),
  duration: z.string().min(1, "Medication duration is required"),
  prescribedBy: z.string().min(1, "Please select a medical provider"),
  notes: z.string().optional(),
});

type medicationFormValues = z.infer<typeof medicationFormSchema>;

const defaultValues: Partial<medicationFormValues> = {
  medication: "",
  dosage: "",
  frequency: "",
  startDate: new Date(),
  endDate: new Date(),
  status: "Active",
  duration: "",
  prescribedBy: "",
  notes: "",
};

const AddVisitMedicationForm = ({
  patientId,
  visitId,
}: {
  patientId: String;
  visitId: String;
}) => {
  const [medicalProviders, setMedicalProvidiers] = useState<MedicalProvider[]>(
    []
  );
  const [fetchingData, setFetchingData] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<medicationFormValues>({
    resolver: zodResolver(medicationFormSchema),
    defaultValues,
  });

  const watchStartDate = form.watch("startDate");
  const watchEndDate = form.watch("endDate");

  // Auto-calculate duration in days when startDate or endDate changes
  useEffect(() => {
    if (watchStartDate && watchEndDate) {
      const start = new Date(watchStartDate);
      const end = new Date(watchEndDate);
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays >= 0) {
          form.setValue(
            "duration",
            `${diffDays} day${diffDays !== 1 ? "s" : ""}`
          );
        }
      }
    }
  }, [watchStartDate, watchEndDate, form]);

  useEffect(() => {
    const fetchData = async () => {
      const medicalProviderData = await getData(MEDICAL_PROVIDERS_ENDPOINT);
      setMedicalProvidiers(medicalProviderData || []);
    };
    fetchData().then((data) => {
      setFetchingData(false);
    });
  }, []);

  const onSubmit = async (data: medicationFormValues) => {
    setIsLoading(true);

    const payload = {
      ...data,
      visitId: visitId,
      patientId: patientId,
    };
    try {
      const response = await postData(MEDICATIONS_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Medication Successfully created");
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
        actionLabel="Prescribe Medication"
        title="Medication Management"
        description="Add, edit, or remove visit medications."
      >
        <div className="sm:px-1 px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-3 gap-4">
                <CustomFormField
                  control={form.control}
                  name="medication"
                  label="Medication"
                  placeholder="Enter drug name"
                />
                <CustomFormField
                  control={form.control}
                  name="dosage"
                  label="Dosage"
                  placeholder="Enter prescription dosage"
                />
                <FormSelectPopover
                  control={form.control}
                  name="frequency"
                  label="Frequency"
                  placeholder="Select Frequency"
                  items={frequencyOptions.map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  valueKey="value"
                  displayValue={(m) => m.label}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <CustomDateField
                  control={form.control}
                  name="startDate"
                  label="Start Date"
                  placeholder="Pick a Date"
                />
                <CustomDateField
                  control={form.control}
                  name="endDate"
                  label="End Date"
                  placeholder="Pick a Date"
                />
                <CustomFormField
                  control={form.control}
                  readonly={true}
                  name="duration"
                  label="Duration"
                  placeholder="Enter duration of prescription"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormSelectPopover
                  control={form.control}
                  name="status"
                  label="Status"
                  placeholder="Select Status"
                  items={statuses.map((status) => ({
                    label: status,
                    value: status,
                  }))}
                  valueKey="value"
                  displayValue={(m) => m.label}
                />
                {fetchingData ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  <FormSelectPopover
                    control={form.control}
                    name="prescribedBy"
                    label="Medical Provider"
                    placeholder="Select Medical Provider"
                    items={medicalProviders}
                    valueKey="_id"
                    displayValue={(m) => constructUserName(m)}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Dosage Instructions"
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
                  Prescribe Medication
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </ResponsiveDialog>
    </>
  );
};

export default AddVisitMedicationForm;
