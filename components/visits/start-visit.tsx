"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const queues = [
  "Lab",
  "Screening",
  "Procedure",
  "Triage",
  "Imaging",
  "Optical",
] as const;

const paymentMethods = [
  "Cash",
  "Insurance",
  "Card",
  "MobileMoney",
  "Free",
] as const;

const FormSchema = z.object({
  payment_method: z.enum(paymentMethods, {
    required_error: "You need to select a payment method.",
  }),
  queue: z.enum(queues, {
    errorMap: () => ({ message: "Invalid queue selection" }),
  }),
});

export default function StartVisit() {
  const params = useParams();
  const patientId = params?.id;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

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
            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Select billing method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {paymentMethods.map((method) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={method}
                        >
                          <FormControl>
                            <RadioGroupItem value={method} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {method}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="queue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Queue</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select queue" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {queues.map((queue) => (
                        <SelectItem key={queue} value={queue}>
                          {queue}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Start Visit</Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
