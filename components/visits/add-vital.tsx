"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { VITALS_ENDPOINT } from "@/utilities/endpoints";
import { postData } from "@/utilities/api";
import ResponsiveDialog from "../shared/ResponsiveDrawer";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomFormField from "../forms/input";

// Zod schema
const vitalFormSchema = z.object({
  body_temperature: z.string().nonempty("Body temperature is required"),
  pulse_rate: z.string().nonempty("Pulse rate is required"),
  respiration_rate: z.string().nonempty("Respiration rate is required"),
  blood_pressure: z.string().nonempty("Blood pressure is required"),
  overall_status: z.string().nonempty("Overall status is required"),
  weight: z
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .min(1),
  blood_glucose: z.string().nonempty("Blood glucose is required"),
  health_status: z.string().nonempty("Health status is required"),
});

type vitalFormValues = z.infer<typeof vitalFormSchema>;

const defaultValues: Partial<vitalFormValues> = {
  body_temperature: "",
  pulse_rate: "",
  respiration_rate: "",
  blood_pressure: "",
  overall_status: "",
  weight: 1,
  blood_glucose: "",
  health_status: "",
};

const AddVitalForm = ({
  patientId,
  visitId,
}: {
  patientId: String;
  visitId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<vitalFormValues>({
    resolver: zodResolver(vitalFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: vitalFormValues) => {
    const payload = {
      ...data,
      patient_id: patientId,
      visit_id: visitId,
    };
    try {
      const response = await postData(VITALS_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Vital Successfully created");
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
        actionLabel="Add Vital"
        title="Vitals Management"
        description="Add a patient's vital."
      >
        <div className="sm:px-1 px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-3 gap-4">
                <CustomFormField
                  control={form.control}
                  name="body_temperature"
                  label="Body Temparature"
                  placeholder="Enter body temparature in degrees Celsius"
                />
                <CustomFormField
                  control={form.control}
                  name="pulse_rate"
                  label="Pulse Rate"
                  placeholder="Enter patient's heart rate"
                />
                <CustomFormField
                  control={form.control}
                  name="respiration_rate"
                  label="Respiration Rate"
                  placeholder="Enter respiration rate"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <CustomFormField
                  control={form.control}
                  name="blood_pressure"
                  label="Blood Pressure"
                  placeholder="Enter patient's blood pressure level"
                />
                <CustomFormField
                  control={form.control}
                  name="blood_glucose"
                  label="Blood Sugar"
                  placeholder="Enter patient's blood glucose level"
                />
                <CustomFormField
                  control={form.control}
                  name="weight"
                  label="Weight"
                  placeholder="Enter patient's weight"
                  type="number"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <CustomFormField
                  control={form.control}
                  name="health_status"
                  label="Health Status"
                  placeholder="Enter health status"
                />
                <CustomFormField
                  control={form.control}
                  name="overall_status"
                  label="Overall Patient Status"
                  placeholder="Enter patient's overall status"
                />
              </div>

              <div>
                <Button type="submit" disabled={isLoading} className="ml-auto">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <Save className="mr-2 h-4 w-4" />
                  Add Vital
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </ResponsiveDialog>
    </>
  );
};

export default AddVitalForm;
