"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { paymentMethods } from "@/lib/data";
import { useEffect, useState } from "react";
import { getData, postData } from "@/utilities/api";
import {
  PATIENTS_ENDPOINT,
  QUEUES_ENDPOINT,
  VISITS_ENDPOINT,
} from "@/utilities/endpoints";
import { Patient, Queue } from "@/types/data";
import FormSelectPopover from "../forms/select";
import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Checkbox } from "../ui/checkbox";

type Props = {
  fromVisitsPage: boolean;
};
const paymentMethodValues = paymentMethods.map((s) => s.label) as [
  string,
  ...string[]
];

const visitFormSchema = z.object({
  payment_method: z.enum(paymentMethodValues, {
    required_error: "You need to select a payment method.",
  }),
  patient_id: z.string(),
  isFollowUp: z.boolean(),
  currentQueue: z.string().nonempty("Please select a queue"),
});

type visitFormValues = z.infer<typeof visitFormSchema>;

const defaultValues: Partial<visitFormValues> = {
  payment_method: "",
  isFollowUp: false,
  currentQueue: "",
};

export default function StartVisit({ fromVisitsPage = false }: Props) {
  const [queues, setQueues] = useState<Queue[]>([]);
  const [patientsData, setPatients] = useState<Patient[]>([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const patientId = params?.id;
  const form = useForm<visitFormValues>({
    resolver: zodResolver(visitFormSchema),
    defaultValues,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [queueData, patients] = await Promise.all([
        getData(QUEUES_ENDPOINT),
        getData(PATIENTS_ENDPOINT),
      ]);
      setPatients(patients || []);
      setQueues(queueData || []);
    };
    fetchData().then((data) => {
      setFetchingData(false);
    });
  }, []);

  const onSubmit = async (data: visitFormValues) => {
    const patientIdVal = fromVisitsPage ? data.patient_id : patientId;
    const payload = {
      ...data,
      patient_id: patientIdVal || "",
      status: "ARRIVED",
    };
    try {
      const response = await postData(VISITS_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Visit Successfully started");
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Start Visit</Button>
      </SheetTrigger>
      <SheetContent className="w-[700px] sm:w-[840px]">
        <SheetHeader>
          <SheetTitle>Start Visit</SheetTitle>
          <SheetDescription>Start a patient visit here</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 p-4"
          >
            {fetchingData ? (
              <Skeleton className="h-4 w-[250px]" />
            ) : (
              <>
                {fromVisitsPage && (
                  <FormSelectPopover
                    control={form.control}
                    name="patient_id"
                    label="Patient"
                    placeholder="Select patient"
                    items={patientsData}
                    valueKey="_id"
                    displayValue={(p) => `${p.first_name} ${p.last_name}`}
                  />
                )}
              </>
            )}
            <FormSelectPopover
              control={form.control}
              name="payment_method"
              label="Billing Method"
              placeholder="Select billing method"
              items={paymentMethods}
              valueKey="value"
              displayValue={(p) => p?.label}
            />

            {fetchingData ? (
              <Skeleton className="h-4 w-[250px]" />
            ) : (
              <FormSelectPopover
                control={form.control}
                name="currentQueue"
                label="Queue"
                placeholder="Select queue"
                items={queues}
                valueKey="_id"
                displayValue={(d) => d?.name}
              />
            )}

            <FormField
              control={form.control}
              name="isFollowUp"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="isFollowUp"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="isFollowUp">
                      Is this a follow up visit?
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Start Visit
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
