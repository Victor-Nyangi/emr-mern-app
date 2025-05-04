"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Control, useForm } from "react-hook-form";
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
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { QUEUES_ENDPOINT } from "@/utilities/endpoints";
import { postData } from "@/utilities/api";
import { Calendar1Icon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns/format";
import { toast } from "sonner";

import { Textarea } from "../ui/textarea";
import { Department, MedicalProvider } from "@/types/data";
import FormSelectPopover from "../forms/select";
import CustomFormField from "../forms/input";
import CustomDateField from "../forms/date-picker";

type Props = { medicalProviders: MedicalProvider[]; departments: Department[] };

const statuses = [
  { label: "Waiting", value: "WAITING" },
  { label: "Called", value: "CALLED" },
  { label: "In Service", value: "IN SERVICE" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const statusValues = statuses.map((s) => s.value) as [string, ...string[]];

const priorities = [
  { label: "Emergency", value: "EMERGENCY" },
  { label: "High", value: "HIGH" },
  { label: "Normal", value: "NORMAL" },
  { label: "Low", value: "LOW" },
];

const priorityValues = priorities.map((p) => p.value) as [string, ...string[]];

const queueFormSchema = z.object({
  name: z.string().min(2, "Queue Name must be at least 2 characters.").max(30),
  departmentId: z.string().nonempty("Please select a department Id."),
  assignedTo: z
    .string()
    .nonempty("Please specify who the queue is assigned to."),
  status: z.enum(statusValues, {
    errorMap: () => ({ message: "Invalid status selected" }),
  }),
  serviceStartTime: z.date({
    required_error: "A service start time is required.",
  }),
  serviceEndTime: z.date({ required_error: "A service end time is required." }),
  priority: z.enum(priorityValues, {
    errorMap: () => ({ message: "Invalid priority selection" }),
  }),
  notes: z.string().nonempty("Briefly describe the queue."),
});

type queueFormValues = z.infer<typeof queueFormSchema>;

const defaultValues: Partial<queueFormValues> = {
  name: "",
  departmentId: "",
  assignedTo: "",
  status: "WAITING",
  serviceStartTime: undefined,
  serviceEndTime: undefined,
  priority: "LOW",
  notes: "",
};

const AddQueue = ({ departments, medicalProviders }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<queueFormValues>({
    resolver: zodResolver(queueFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: queueFormValues) => {
    const payload = {
      ...data,
      serviceEndTime: format(
        new Date(data.serviceEndTime),
        "yyyy-MM-dd HH:mm:ss.SSSSSS"
      ),
      serviceStartTime: format(
        new Date(data.serviceStartTime),
        "yyyy-MM-dd HH:mm:ss.SSSSSS"
      ),
    };
    try {
      const response = await postData(QUEUES_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Queue Successfully created");
        router.push("/queues");
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
          <div className="grid grid-cols-3 gap-4">
            <CustomFormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter queue Name"
            />
            <FormSelectPopover
              control={form.control}
              name="departmentId"
              label="Department"
              placeholder="Select department"
              items={departments}
              valueKey="_id"
              displayValue={(d) => d?.name}
            />

            <FormSelectPopover
              control={form.control}
              name="assignedTo"
              label="Medical Provider"
              placeholder="Select Medical Provider"
              items={medicalProviders}
              valueKey="_id"
              displayValue={(p) =>
                `${p.salutation}: ${p.first_name} ${p.last_name}`
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormSelectPopover
              control={form.control}
              name="status"
              label="Status"
              placeholder="Select Status"
              items={statuses}
              valueKey="value"
              displayValue={(s) => s?.label}
            />
            <FormSelectPopover
              control={form.control}
              name="priority"
              label="Priority"
              placeholder="Select Priority"
              items={priorities}
              valueKey="value"
              displayValue={(p) => p?.label}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomDateField
              control={form.control}
              name="serviceStartTime"
              label="Service Start Time"
              placeholder="Pick a Date"
              disabled={new Date() < new Date()}
            />
            <CustomDateField
              control={form.control}
              name="serviceEndTime"
              label="Service End Time"
              placeholder="Pick a Date"
              disabled={new Date() < new Date()}
            />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about the queue"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Give some context on what the purpose of the Queue is
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register queue
          </Button>
        </form>
      </Form>{" "}
    </>
  );
};

export default AddQueue;
