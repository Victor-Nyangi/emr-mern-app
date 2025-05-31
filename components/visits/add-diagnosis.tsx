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
  DIAGNOSIS_ENDPOINT,
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

const diagnosisTypes = [
  "Primary",
  "Secondary",
  "Differential",
  "Working",
] as const;

const statuses = ["Active", "Resolved", "Chronic", "Provisional"] as const;

// Zod schema
const diagnosisFormSchema = z.object({
  diagnosis: z.string().min(1, "Diagnosis is required"),
  code: z.string().min(1, "ICD-10 code is required"),
  type: z.enum(diagnosisTypes).default("Primary"),
  date: z.coerce.date().default(new Date()),
  status: z.enum(statuses).default("Active"),
  medicalProvider_id: z.string().min(1, "medicalProvider_id is required"),
  notes: z.string().optional(),
});

type diagnosisFormValues = z.infer<typeof diagnosisFormSchema>;

const defaultValues: Partial<diagnosisFormValues> = {
  diagnosis: "",
  code: "",
  type: "Primary",
  date: undefined,
  status: "Active",
  medicalProvider_id: "",
  notes: "",
};

const AddDiagnosisForm = ({ visitId }: { visitId: string }) => {
  const [medicalProviders, setMedicalProvidiers] = useState<MedicalProvider[]>(
    []
  );
  const [fetchingData, setFetchingData] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<diagnosisFormValues>({
    resolver: zodResolver(diagnosisFormSchema),
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

  const onSubmit = async (data: diagnosisFormValues) => {
    const payload = {
      ...data,
      visit_id: visitId,
    };
    try {
      const response = await postData(DIAGNOSIS_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Diagnosis Successfully created");
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
        actionLabel="Add Diagnosis"
        title="Diagnoses Management"
        description="Add a patient's diagnosis."
      >
        <div className="sm:px-1 px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <CustomFormField
                  control={form.control}
                  name="diagnosis"
                  label="Diagnosis"
                  placeholder="Enter diagnosis"
                />
                <CustomFormField
                  control={form.control}
                  name="code"
                  label="Code"
                  placeholder="Enter patient's code"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormSelectPopover
                  control={form.control}
                  name="type"
                  label="Type"
                  placeholder="Select Diagnosis Type"
                  items={diagnosisTypes.map((type) => ({
                    label: type,
                    value: type,
                  }))}
                  valueKey="value"
                  displayValue={(m) => m.label}
                />
                <CustomDateField
                  control={form.control}
                  name="date"
                  label="Diagnosis Date"
                  placeholder="Pick a Date"
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
                    name="medicalProvider_id"
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
                  Add Diagnosis
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </ResponsiveDialog>
    </>
  );
};

export default AddDiagnosisForm;
