"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  APPOINTMENTS_ENDPOINT,
  MEDICAL_PROVIDERS_ENDPOINT,
  PATIENTS_ENDPOINT,
} from "@/utilities/endpoints";
import { getData, postData } from "@/utilities/api";
import { Loader2 } from "lucide-react";
import { constructUserName } from "@/lib/utils";
import { format } from "date-fns/format";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import FormSelectPopover from "../forms/select";
import CustomDateField from "../forms/date-picker";
import { TimePicker } from "../forms/time-picker";
import { MedicalProvider, Patient } from "@/types/data";
import { Skeleton } from "../ui/skeleton";

enum AppointmentStatus {
  scheduled = "Scheduled",
  completed = "Completed",
  cancelled = "Cancelled",
}

enum AppointmentType {
  consultation = "Consultation",
  annualPhysical = "Annual Physical",
  followUp = "Follow-up",
}

const appointmentStatusChoices: Array<{
  value: AppointmentStatus;
  label: string;
}> = [
  { value: AppointmentStatus.scheduled, label: "Scheduled" },
  { value: AppointmentStatus.completed, label: "Completed" },
  { value: AppointmentStatus.cancelled, label: "Cancelled" },
];

const appointmentTypeChoices: Array<{ value: AppointmentType; label: string }> =
  [
    { value: AppointmentType.consultation, label: "Consultation" },
    { value: AppointmentType.annualPhysical, label: "Annual Physical" },
    { value: AppointmentType.followUp, label: "Follow-up" },
  ];

const appointmentFormSchema = z.object({
  patient_id: z.string().nonempty("Please select a patient."),
  medicalProvider_id: z.string().nonempty("Please select a medical provider."),
  status: z.enum(["Scheduled", "Completed", "Cancelled"], {
    errorMap: () => ({ message: "Invalid status selection" }),
  }),
  type: z.enum(["Consultation", "Annual Physical", "Follow-up"], {
    errorMap: () => ({ message: "Invalid appointment type selection" }),
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format",
  }),
  date: z.date({ required_error: "A date is required." }),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

const defaultValues: Partial<AppointmentFormValues> = {
  patient_id: "",
  medicalProvider_id: "",
  status: "Scheduled",
  type: "Consultation",
  time: "",
  date: undefined,
};

const AddAppointment = () => {
  const [medicalProviders, setMedicalProvidiers] = useState<MedicalProvider[]>(
    []
  );
  const [patientsList, setPatients] = useState<Patient[]>([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [medicalProviderData, patients] = await Promise.all([
        getData(MEDICAL_PROVIDERS_ENDPOINT),
        getData(PATIENTS_ENDPOINT),
      ]);
      setMedicalProvidiers(medicalProviderData || []);
      setPatients(patients || []);
    };
    fetchData().then((data) => {
      setFetchingData(false);
    });
  }, []);

  const onSubmit = async (data: AppointmentFormValues) => {
    const payload = {
      ...data,
      date: format(new Date(data.date), "yyyy-MM-dd HH:mm:ss.SSSSSS"),
    };

    try {
      setIsLoading(true);
      const response = await postData(APPOINTMENTS_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Appointment Successfully created");
        router.push("/appointments");
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
              name="patient_id"
              label="Patient"
              placeholder="Select patient"
              items={patientsList}
              valueKey="_id"
              displayValue={(patient) =>
                `${patient.first_name} ${patient.last_name}`
              }
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

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appointmentStatusChoices.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appointment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select appointment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appointmentTypeChoices.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomDateField
              control={form.control}
              name="date"
              label="Date"
              placeholder="Pick a Date"
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <TimePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" variant="teal" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Appointment
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddAppointment;
