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
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getData, postData } from "@/utilities/api";
import { QUEUES_ENDPOINT, VISITS_ENDPOINT } from "@/utilities/endpoints";
import { Queue } from "@/types/data";
import FormSelectPopover from "../forms/select";
import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

type PageProps = {
  visitCurrentQueue: string;
  visitId: string;
};

const visitFormSchema = z.object({
  currentQueue: z.string().nonempty("Please select a queue"),
});

type visitFormValues = z.infer<typeof visitFormSchema>;

const defaultValues: Partial<visitFormValues> = {
  currentQueue: "",
};

export default function TransitionVisit({
  visitCurrentQueue,
  visitId,
}: PageProps) {
  const [queues, setQueues] = useState<Queue[]>([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<visitFormValues>({
    resolver: zodResolver(visitFormSchema),
    defaultValues,
  });

  useEffect(() => {
    const fetchData = async () => {
      const queueData = await getData(QUEUES_ENDPOINT);
      setQueues(queueData || []);
    };
    fetchData().then((data) => {
      setFetchingData(false);
    });
  }, []);

  const onSubmit = async (data: visitFormValues) => {
    const transition = {
      queue: data?.currentQueue,
      prev_queue: visitCurrentQueue,
    };
    const payload = {
      transition: transition,
      status: "IN PROGRESS",
    };
    try {
      const response = await postData(
        `${VISITS_ENDPOINT}transition/${visitId}`,
        payload,
        "PATCH"
      );
      if (response?._id) {
        toast.success("Visit Successfully transitioned");
        router.refresh();
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
        <Button variant="success" size="sm">
          <span className="text-xs">Transition Visit</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[700px] sm:w-[840px]">
        <SheetHeader>
          <SheetTitle>Transition Visit</SheetTitle>
          <SheetDescription>Transition a patient visit here</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 p-4"
          >
            {fetchingData ? (
              <Skeleton className="h-4 w-[250px]" />
            ) : (
              <FormSelectPopover
                control={form.control}
                name="currentQueue"
                label="Queue"
                disableItem={(d) => d._id === visitCurrentQueue}
                placeholder="Select queue"
                items={queues}
                valueKey="_id"
                displayValue={(d) => d?.name}
              />
            )}
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Send patient to queue
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
