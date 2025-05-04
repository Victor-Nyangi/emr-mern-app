"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import {
  APPOINTMENTS_ENDPOINT,
  MEDICAL_PROVIDERS_ENDPOINT,
} from "@/utilities/endpoints";
import { getData, postData } from "@/utilities/api";
import ResponsiveDialog from "../shared/ResponsiveDrawer";
import { MedicalProvider } from "@/types/data";
import FormSelectPopover from "../forms/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "../ui/skeleton";
import CustomDateField from "../forms/date-picker";
import { TimePicker } from "../forms/time-picker";
import { constructUserName } from "@/lib/utils";

const appointmentTypes = [
  "Consultation",
  "Annual Physical",
  "Follow-up",
] as const;
// Zod schema
const appointmentFormSchema = z.object({
  medicalProvider_id: z.string().nonempty("Please select a medical provider"),
  type: z.enum(appointmentTypes).default("Consultation"),
  date: z.coerce.date({
    required_error: "Appointment date is required",
    invalid_type_error: "Appointment date must be a valid date",
  }),
});
type appointmentFormValues = z.infer<typeof appointmentFormSchema>;

const defaultValues: Partial<appointmentFormValues> = {
  medicalProvider_id: "",
  type: "Consultation",
  date: undefined,
};

const AddAppointmentForm = ({ patientId }: { patientId: String }) => {
  const [medicalProviders, setMedicalProvidiers] = useState<MedicalProvider[]>(
    []
  );
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [fetchingData, setFetchingData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<appointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
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

  const onSubmit = async (data: appointmentFormValues) => {
    const payload = {
      ...data,
      status: "Scheduled",
      time: selectedTime,
      patient_id: patientId,
    };
    try {
      const response = await postData(APPOINTMENTS_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Appointment Successfully created");
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
        actionLabel="Schedule New"
        title="Appointment Management"
        description="Book a patient appointment."
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

              <FormSelectPopover
                control={form.control}
                name="type"
                label="Type"
                placeholder="Select Appointment Type"
                items={appointmentTypes.map((type) => ({
                  label: type,
                  value: type,
                }))}
                valueKey="value"
                displayValue={(m) => m.label}
              />

              <CustomDateField
                control={form.control}
                name="date."
                label="Appointment Date"
                placeholder="Pick a Date"
              />

              <div className="mx-auto py-10">
                <div>
                  <p>
                    Select a time between 09:00 and 17:45 in 15-minute
                    intervals.
                  </p>
                  <TimePicker value={selectedTime} onChange={setSelectedTime} />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isLoading || selectedTime === ""}
                  className="ml-auto"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <Save className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </ResponsiveDialog>
    </>
  );
};

export default AddAppointmentForm;
