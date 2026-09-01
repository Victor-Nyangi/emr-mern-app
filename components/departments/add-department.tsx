"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { DEPARTMENTS_ENDPOINT } from "@/utilities/endpoints";
import { postData } from "@/utilities/api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import CustomFormField from "../forms/input";
import { Textarea } from "../ui/textarea";
import FormSelectPopover from "../forms/select";

const departmentTypes = [
  "Triage",
  "Lab",
  "Radiology",
  "Pharmacy",
  "Consultation",
] as const;
const departmentFormSchema = z.object({
  name: z
    .string()
    .min(2, "Department name must be at least 2 characters.")
    .max(100),
  type: z.enum(departmentTypes, {
    errorMap: () => ({ message: "Please select a valid department type." }),
  }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(500),
});

type DepartmentFormValues = z.infer<typeof departmentFormSchema>;

const defaultValues: Partial<DepartmentFormValues> = {
  name: "",
  type: "Triage",
  description: "",
};

enum DepartmentType {
  triage = "Consultation",
  lab = "Annual Physical",
  radiology = "Radiology",
  pharmacy = "Pharmacy",
  consultation = "Consultation",
}

const AddDepartment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: DepartmentFormValues) => {
    setIsLoading(true);

    try {
      const response = await postData(DEPARTMENTS_ENDPOINT, data);
      if (response?._id) {
        toast.success("Department successfully created");
        router.push("/departments");
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

  const departmentTypeChoices: Array<{
    value: DepartmentType;
    label: string;
  }> = [
    { value: DepartmentType.consultation, label: "Consultation" },
    { value: DepartmentType.lab, label: "Annual Physical" },
    { value: DepartmentType.triage, label: "Follow-up" },
  ];

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomFormField
            control={form.control}
            name="name"
            label="Department Name"
            placeholder="Enter department name"
          />

          <FormSelectPopover
            control={form.control}
            name="type"
            label="Department Type"
            placeholder="Select Department Type"
            items={departmentTypes.map((type) => ({
              label: type,
              value: type,
            }))}
            valueKey="value"
            displayValue={(m) => m.label}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the department and its functions"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of what this department handles
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Department
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddDepartment;
