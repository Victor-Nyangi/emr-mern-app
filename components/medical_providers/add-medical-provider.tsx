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
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { postData } from "@/utilities/api";
import { Loader2 } from "lucide-react";
import { format } from "date-fns/format";
import { toast } from "sonner";

import CustomFormField from "../forms/input";
import FormSelectPopover from "../forms/select";
import { MEDICAL_PROVIDERS_ENDPOINT } from "@/utilities/endpoints";
import { Department, MedicalProvider } from "@/types/data";
import { MedicalProviderRoles } from "@/lib/data";
import CustomDateField from "../forms/date-picker";
import { Checkbox } from "../ui/checkbox";

type Props = { departments: Department[]; medicalProvider?: MedicalProvider };

const roleValues = MedicalProviderRoles.map((s) => s.value) as [
  string,
  ...string[]
];

const medProviderFormSchema = z.object({
  first_name: z
    .string()
    .min(2, "First Name must be at least 2 characters.")
    .max(30),
  last_name: z
    .string()
    .min(2, "Last Name must be at least 2 characters.")
    .max(30),
  date_of_birth: z.date({ required_error: "A date of birth is required." }),
  address: z.string().nonempty("Please enter the medical provider's address."),
  phone_number: z
    .string()
    .nonempty("Please enter the medical provider's phone number."),
  email: z.string().email("Invalid email"),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "N/A"], {
    errorMap: () => ({ message: "Invalid gender selection" }),
  }),
  salutation: z.string().min(2).max(30),
  department: z.string().nonempty("Please select a department Id."),

  role: z.enum(roleValues, {
    errorMap: () => ({ message: "Invalid blood group selection" }),
  }),
  is_active: z.boolean(),
});

type medProviderFormValues = z.infer<typeof medProviderFormSchema>;

const defaultValues: Partial<medProviderFormValues> = {
  first_name: "",
  last_name: "",
  salutation: "",
  address: "",
  phone_number: "",
  email: "",
  date_of_birth: undefined,
  gender: "N/A",
  department: "",
  role: "",
  is_active: false,
};

const AddMedicalProvider = ({ departments, medicalProvider }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<medProviderFormValues>({
    resolver: zodResolver(medProviderFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: medProviderFormValues) => {
    const payload = {
      ...data,
      is_active: false,
      date_of_birth: format(
        new Date(data.date_of_birth),
        "yyyy-MM-dd HH:mm:ss.SSSSSS"
      ),
    };
    try {
      const response = await postData(MEDICAL_PROVIDERS_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Medical Provider Successfully registered");
        router.push("/medical-providers");
      } else {
        toast.error("Submission Error", {
          description: "Error in submitting request! Please try again.",
        });
      }
      form.reset(defaultValues);
    } catch (error) {
      toast.error("Submission Error", {
        description: (error as Error)?.message || "An error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Populate form values based on queue or default values
  useEffect(() => {
    if (medicalProvider) {
      form.reset({
        first_name: medicalProvider.first_name || "",
        last_name: medicalProvider.last_name || "",
        salutation: medicalProvider.salutation || "",
        address: medicalProvider.address || "",
        phone_number: medicalProvider.phone_number as string || "",
        email: medicalProvider.email || "",
        date_of_birth: medicalProvider.date_of_birth
          ? new Date(medicalProvider.date_of_birth)
          : undefined,
        gender: medicalProvider.gender || "N/A",
        department: medicalProvider.department || "",
        role: medicalProvider.role || "",
        is_active: false,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [medicalProvider, form]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <CustomFormField
              control={form.control}
              name="salutation"
              label="Salutation"
              placeholder="Enter salutation"
            />
            <CustomFormField
              control={form.control}
              name="first_name"
              label="First Name"
              placeholder="First name"
            />
            <CustomFormField
              control={form.control}
              name="last_name"
              label="Last Name"
              placeholder="Last name"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <CustomDateField
              control={form.control}
              name="date_of_birth."
              label="Date of Birth"
              placeholder="Pick a Date"
            />

            <CustomFormField
              control={form.control}
              name="phone_number"
              label="Phone Number"
              placeholder="Phone number"
            />
            <CustomFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <CustomFormField
              control={form.control}
              name="address"
              label="Address"
              placeholder="Address"
            />
            <FormSelectPopover
              control={form.control}
              name="department"
              label="Department"
              placeholder="Select department"
              items={departments}
              valueKey="_id"
              displayValue={(d) => d?.name}
            />

            <FormSelectPopover
              control={form.control}
              name="role"
              label="Role"
              placeholder="Select role"
              items={MedicalProviderRoles}
              valueKey="value"
              displayValue={(d) => d?.label}
            />
          </div>

          {medicalProvider && (
            <FormField
              control={form.control}
              name="is_active"
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
                      {medicalProvider.is_active ? "De-activate" : "Activate"}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>{medicalProvider ? "Edit" : "Register"}</span>
            medical provider
          </Button>
        </form>
      </Form>{" "}
    </>
  );
};

export default AddMedicalProvider;
