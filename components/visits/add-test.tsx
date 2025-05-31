"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import {
  MEDICAL_PROVIDERS_ENDPOINT,
  TESTS_ENDPOINT,
} from "@/utilities/endpoints";
import { getData, postData } from "@/utilities/api";
import ResponsiveDialog from "../shared/ResponsiveDrawer";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomFormField from "../forms/input";
import CustomDateField from "../forms/date-picker";
import FormSelectPopover from "../forms/select";
import { Skeleton } from "../ui/skeleton";
import { MedicalProvider } from "@/types/data";
import { constructUserName } from "@/lib/utils";

const statuses = ["Ordered", "Pending", "Completed", "Cancelled"] as const;

// Zod schema
const testFormSchema = z.object({
  testName: z.string().min(1, "Test Name is required"),
  result: z.string().min(1, "Test result is required"),
  dateOrdered: z.coerce.date().default(new Date()),
  status: z.enum(statuses).default("Ordered"),
  ordered_by: z.string().min(1, "ordered_by is required"),
});

type testFormValues = z.infer<typeof testFormSchema>;

const defaultValues: Partial<testFormValues> = {
  testName: "",
  dateOrdered: undefined,
  status: "Ordered",
  ordered_by: "",
  result: "",
};

const AddTestForm = ({ visitId }: { visitId: string }) => {
  const [medicalProviders, setMedicalProvidiers] = useState<MedicalProvider[]>(
    []
  );
  const [fetchingData, setFetchingData] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<testFormValues>({
    resolver: zodResolver(testFormSchema),
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

  const onSubmit = async (data: testFormValues) => {
    setIsLoading(true);

    const payload = {
      ...data,
      visit_id: visitId,
    };
    try {
      const response = await postData(TESTS_ENDPOINT, payload);
      if (response?._id) {
        toast.success("Test Successfully created");
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
        actionLabel="Add Test"
        title="Tests Management"
        description="Add a patient's test."
      >
        <div className="sm:px-1 px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-3 gap-4">
                <CustomFormField
                  control={form.control}
                  name="testName"
                  label="Test Name"
                  placeholder="Enter Test Name"
                />
                <CustomFormField
                  control={form.control}
                  name="result"
                  label="Result"
                  placeholder="Enter test's result"
                />
                <CustomDateField
                  control={form.control}
                  name="dateOrdered"
                  label="Date Ordered"
                  placeholder="Pick a Date"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormSelectPopover
                  control={form.control}
                  name="status"
                  label="Status"
                  placeholder="Select Status"
                  items={statuses.map((status) => ({
                    label: status,
                    value: status,
                  }))}
                  valueKey="value"
                  displayValue={(m) => m.label}
                />
                {fetchingData ? (
                  <Skeleton className="h-4 w-[250px]" />
                ) : (
                  <FormSelectPopover
                    control={form.control}
                    name="ordered_by"
                    label="Ordered By"
                    placeholder="Select Medical Provider"
                    items={medicalProviders}
                    valueKey="_id"
                    displayValue={(m) => constructUserName(m)}
                  />
                )}
              </div>

              <div>
                <Button type="submit" disabled={isLoading} className="ml-auto">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <Save className="mr-2 h-4 w-4" />
                  Add Test
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </ResponsiveDialog>
    </>
  );
};

export default AddTestForm;
