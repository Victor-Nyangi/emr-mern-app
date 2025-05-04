"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useFieldArray, useForm } from "react-hook-form";
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
import { PATIENTS_ENDPOINT } from "@/utilities/endpoints";
import { postData } from "@/utilities/api";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns/format";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CustomFormField from "../forms/input";
import FormSelectPopover from "../forms/select";
import CustomDateField from "../forms/date-picker";

enum Gender {
  male = "MALE",
  female = "FEMALE",
  other = "OTHER",
  na = "N/A",
}

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "N/A",
] as const;

const genderChoices: Array<{ value: Gender; label: string }> = [
  { value: Gender.male, label: "Male" },
  { value: Gender.female, label: "Female" },
  { value: Gender.other, label: "Other" },
  { value: Gender.na, label: "N/A" },
];

const patientFormSchema = z.object({
  first_name: z
    .string()
    .min(2, "First Name must be at least 2 characters.")
    .max(30),
  last_name: z
    .string()
    .min(2, "Last Name must be at least 2 characters.")
    .max(30),
  salutation: z.string().min(2).max(30),
  address: z.string().nonempty("Please enter the patient's address."),
  email: z.string().email("Invalid email"),
  phone_number: z.string().nonempty("Please enter the patient's phone number."),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "N/A"], {
    errorMap: () => ({ message: "Invalid gender selection" }),
  }),
  date_of_birth: z.date({ required_error: "A date of birth is required." }),
  emergency_contact: z.string().nonempty("Please enter an emergency contact."),
  blood_group: z.enum(bloodGroups, {
    errorMap: () => ({ message: "Invalid blood group selection" }),
  }),
  allergies: z.array(z.object({ value: z.string() })).optional(),
  underlying_conditions: z.array(z.object({ value: z.string() })).optional(),
});

type patientFormValues = z.infer<typeof patientFormSchema>;

const defaultValues: Partial<patientFormValues> = {
  first_name: "",
  last_name: "",
  salutation: "",
  address: "",
  phone_number: "",
  email: "",
  date_of_birth: undefined,
  gender: "N/A",
  emergency_contact: "",
  blood_group: "N/A",
  underlying_conditions: undefined,
  allergies: undefined,
};

const AddPatient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<patientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues,
  });

  const underlyingConditions = useFieldArray({
    name: "underlying_conditions",
    control: form.control,
  });

  const allergies = useFieldArray({
    name: "allergies",
    control: form.control,
  });

  const onSubmit = async (data: patientFormValues) => {
    const mappedConditions =
      data?.underlying_conditions?.map((condition) => condition.value) ?? [];

    const mappedAllergies =
      data?.allergies?.map((condition) => condition.value) ?? [];

    const payload = {
      ...data,
      underlying_conditions: mappedConditions,
      allergies: mappedAllergies,
      is_active: false,
      date_of_birth: format(
        new Date(data.date_of_birth),
        "yyyy-MM-dd HH:mm:ss.SSSSSS"
      ),
    };
    try {
      const response = await postData(PATIENTS_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Patient Successfully registered");
        router.push("/patients");
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
            <FormSelectPopover
              control={form.control}
              name="gender"
              label="Gender"
              placeholder="Select gender"
              items={genderChoices}
              valueKey="value"
              displayValue={(g) => g?.label}
            />
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
          </div>
          <div className="grid grid-cols-3 gap-4">
            <CustomFormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
            />
            <CustomFormField
              control={form.control}
              name="address"
              label="Address"
              placeholder="Address"
            />
            <CustomFormField
              control={form.control}
              name="emergency_contact"
              label="Emergency Contact"
              placeholder="Emergency Contact"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <CustomFormField
              control={form.control}
              name="height"
              label="Height"
              placeholder="Height in cm"
              type="number"
            />
            <CustomFormField
              control={form.control}
              name="weight"
              label="Weight"
              placeholder="Weight in kg"
              type="number"
            />
            <FormField
              control={form.control}
              name="blood_group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            {underlyingConditions.fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`underlying_conditions.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Underlying Conditions
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add underlying conditions if any
                    </FormDescription>
                    <FormControl className="w-1/3 mb-2">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => underlyingConditions.append({ value: "" })}
            >
              Add Condition
            </Button>
          </div>

          <div>
            {allergies.fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`allergies.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      Allergies
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add allergies if any
                    </FormDescription>
                    <FormControl className="w-1/3 mb-2">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => allergies.append({ value: "" })}
            >
              Add Allergy
            </Button>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register patient
          </Button>
        </form>
      </Form>{" "}
    </>
  );
};

export default AddPatient;
