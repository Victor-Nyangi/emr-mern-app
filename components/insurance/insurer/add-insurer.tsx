"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { postData } from "@/utilities/api";

import { toast } from "sonner";

import CustomFormField from "../../forms/input";
import FormSelectPopover from "../../forms/select";
import { insurerPanels } from "@/lib/data";
import { INSURERS_ENDPOINT } from "@/utilities/endpoints";
import { Separator } from "@radix-ui/react-separator";
import { Loader2 } from "lucide-react";

const statuses = [
  { label: "Active", value: "Active" },
  { label: "In Active", value: "Inactive" },
];
// ✅ Sub-schema: Contact
const contactSchema = z.object({
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  address: z.string().optional(),
});

// ✅ Sub-schema: Agent
const agentSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});

// ✅ Main Insurer schema
const insurerFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  status: z.enum(["Active", "Inactive", ""]).default("Active").optional(), // Optional if backend enforces it
  panel: z.enum(["Tier I", "Tier II", "Tier III", "Tier IV"]),
  payerId: z.string().optional(),
  contact: contactSchema.optional(),
  agent: agentSchema.optional(),
});

type insurerFormValues = z.infer<typeof insurerFormSchema>;

const defaultValues: Partial<insurerFormValues> = {
  name: "",
  status: "Inactive",
  panel: "Tier I",
  payerId: "",
  contact: {
    email: "",
    phone: "",
    website: "",
    address: "",
  },
  agent: {
    name: "",
    phone: "",
  },
};

const AddInsurer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<insurerFormValues>({
    resolver: zodResolver(insurerFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: insurerFormValues) => {
    try {
      const response = await postData(INSURERS_ENDPOINT, data);
      if (response?._id) {
        toast.success("Insurer Successfully registered");
        router.push("/insurance/insurer");
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
              placeholder="Enter name"
            />

            <FormSelectPopover
              control={form.control}
              name="panel"
              label="Panel"
              placeholder="Select Panel"
              items={insurerPanels}
              valueKey="value"
              displayValue={(d) => d?.label}
            />
            <FormSelectPopover
              control={form.control}
              name="status"
              label="Status"
              placeholder="Select status"
              items={statuses}
              valueKey="value"
              displayValue={(d) => d?.label}
            />
          </div>

          <p>Enter Contact Information</p>
          <Separator />

          <div className="grid grid-cols-4 gap-4">
            <CustomFormField
              control={form.control}
              name="contact.phone"
              label="Phone Number"
              placeholder="Phone number"
            />
            <CustomFormField
              control={form.control}
              name="contact.website"
              label="Website"
              placeholder="Website"
            />
            <CustomFormField
              control={form.control}
              name="contact.email"
              label="Email"
              placeholder="Email"
              type="email"
            />

            <CustomFormField
              control={form.control}
              name="contact.address"
              label="Address"
              placeholder="Address"
            />
          </div>

          <p>Enter Agent's Information</p>
          <Separator />

          <div className="grid grid-cols-3 gap-4">
            <CustomFormField
              control={form.control}
              name="agent.name"
              label="Agent's Name"
              placeholder="Enter agent's name"
            />
            <CustomFormField
              control={form.control}
              name="agent.phone"
              label="Agent Phone Number"
              placeholder="Agent Phone number"
            />

            <CustomFormField
              control={form.control}
              name="agent.email"
              label="Agent Email"
              placeholder="Agent Email"
              type="email"
            />
          </div>

          <CustomFormField
            control={form.control}
            name="payerId"
            label="Payer Id"
            placeholder="Payer Id"
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register Insurer
          </Button>
        </form>
      </Form>{" "}
    </>
  );
};

export default AddInsurer;
