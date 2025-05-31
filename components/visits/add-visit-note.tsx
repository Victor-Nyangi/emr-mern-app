"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { useFieldArray, useForm } from "react-hook-form";
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
  VISIT_CLINICAL_NOTES_ENDPOINT,
  MEDICAL_PROVIDERS_ENDPOINT,
} from "@/utilities/endpoints";
import { getData, postData } from "@/utilities/api";
import ResponsiveDialog from "../shared/ResponsiveDrawer";
import { MedicalProvider } from "@/types/data";
import { Textarea } from "../ui/textarea";
import FormSelectPopover from "../forms/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "../ui/skeleton";
import { cn, constructUserName } from "@/lib/utils";
import { Input } from "../ui/input";

// Zod schema
const clinicalNoteFormSchema = z.object({
  content: z.string().optional(),
  medicalProvider_id: z.string().nonempty("Please select a medical provider"),
  assessment: z.array(z.object({ value: z.string() })).default([]),
  plan: z.array(z.object({ value: z.string() })).default([]),
});
type clinicalNoteFormValues = z.infer<typeof clinicalNoteFormSchema>;

const defaultValues: Partial<clinicalNoteFormValues> = {
  medicalProvider_id: "",
  content: "",
  assessment: [],
  plan: [],
};

const AddVisitClinicalNoteForm = ({ visitId }: { visitId: String }) => {
  const [medicalProviders, setMedicalProvidiers] = useState<MedicalProvider[]>(
    []
  );
  const [fetchingData, setFetchingData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<clinicalNoteFormValues>({
    resolver: zodResolver(clinicalNoteFormSchema),
    defaultValues,
  });

  const assessments = useFieldArray({
    name: "assessment",
    control: form.control,
  });

  const plans = useFieldArray({
    name: "plan",
    control: form.control,
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

  const onSubmit = async (data: clinicalNoteFormValues) => {
    const assessments =
      data?.assessment?.map((assessment) => assessment.value) ?? [];

    const plans = data?.plan?.map((plan) => plan.value) ?? [];

    const payload = {
      ...data,
      assessment: assessments,
      plan: plans,
      visit_id: visitId,
    };
    try {
      const response = await postData(VISIT_CLINICAL_NOTES_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Clinical Note Successfully created");
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
        actionLabel="Add Note"
        title="Notes Management"
        description="Add a patient clinical note"
      >
        <div className="sm:px-1 px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

              <div>
                {assessments.fields.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`assessment.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          Visit Assessment
                        </FormLabel>
                        <FormDescription
                          className={cn(index !== 0 && "sr-only")}
                        >
                          Add assessment notes if any
                        </FormDescription>
                        <FormControl className="w-1/3 mb-2">
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => assessments.append({ value: "" })}
                >
                  Add Assesment
                </Button>
              </div>

              <div>
                {plans.fields.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`plan.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                          Plan
                        </FormLabel>
                        <FormDescription
                          className={cn(index !== 0 && "sr-only")}
                        >
                          Add patient's treatment plan if any
                        </FormDescription>
                        <FormControl className="w-1/3 mb-2">
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => plans.append({ value: "" })}
                >
                  Add Plan
                </Button>
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
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
                  Save Note
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </ResponsiveDialog>
    </>
  );
};

export default AddVisitClinicalNoteForm;
