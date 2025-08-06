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
import { DRUGS_ENDPOINT } from "@/utilities/endpoints";
import { postData } from "@/utilities/api";
import { Loader2 } from "lucide-react";
import { format } from "date-fns/format";
import { toast } from "sonner";
import CustomFormField from "../forms/input";
import CustomDateField from "../forms/date-picker";

const drugFormSchema = z.object({
  name: z.string().min(2, "Drug name must be at least 2 characters.").max(100),
  description: z.string().min(10, "Description must be at least 10 characters.").max(500),
  manufacter_date: z.date({
    required_error: "Manufacture date is required.",
  }),
  expiry_date: z.date({
    required_error: "Expiry date is required.",
  }),
});

type DrugFormValues = z.infer<typeof drugFormSchema>;

const defaultValues: Partial<DrugFormValues> = {
  name: "",
  description: "",
  manufacter_date: undefined,
  expiry_date: undefined,
};

const AddDrug = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<DrugFormValues>({
    resolver: zodResolver(drugFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: DrugFormValues) => {
    setIsLoading(true);
    const payload = {
      ...data,
      manufacter_date: format(
        new Date(data.manufacter_date),
        "yyyy-MM-dd HH:mm:ss.SSSSSS"
      ),
      expiry_date: format(
        new Date(data.expiry_date),
        "yyyy-MM-dd HH:mm:ss.SSSSSS"
      ),
    };
    
    try {
      const response = await postData(DRUGS_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Drug successfully created");
        router.push("/drugs");
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
            <CustomFormField
              control={form.control}
              name="name"
              label="Drug Name"
              placeholder="Enter drug name"
            />
            <CustomFormField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Enter drug description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomDateField
              control={form.control}
              name="manufacter_date"
              label="Manufacture Date"
              placeholder="Pick manufacture date"
            />
            <CustomDateField
              control={form.control}
              name="expiry_date"
              label="Expiry Date"
              placeholder="Pick expiry date"
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Drug
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddDrug; 