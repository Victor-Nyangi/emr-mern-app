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
import { SERVICES_ENDPOINT } from "@/utilities/endpoints";
import { postData } from "@/utilities/api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import CustomFormField from "../forms/input";
import { Textarea } from "../ui/textarea";

const serviceFormSchema = z.object({
  name: z.string().min(2, "Service name must be at least 2 characters.").max(100),
  description: z.string().min(10, "Description must be at least 10 characters.").max(500),
  charge: z.number().min(0, "Charge must be a positive number."),
  main_purpose: z.string().min(5, "Main purpose must be at least 5 characters.").max(200),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

const defaultValues: Partial<ServiceFormValues> = {
  name: "",
  description: "",
  charge: 0,
  main_purpose: "",
};

const AddService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ServiceFormValues) => {
    setIsLoading(true);
    
    try {
      const response = await postData(SERVICES_ENDPOINT, data);
      if (response?._id) {
        toast.success("Service successfully created");
        router.push("/services");
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
              label="Service Name"
              placeholder="Enter service name"
            />
            <CustomFormField
              control={form.control}
              name="charge"
              label="Charge"
              placeholder="Enter service charge"
              type="number"
            />
          </div>

          <CustomFormField
            control={form.control}
            name="main_purpose"
            label="Main Purpose"
            placeholder="Enter main purpose of the service"
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the service in detail"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of what this service entails
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Service
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddService; 