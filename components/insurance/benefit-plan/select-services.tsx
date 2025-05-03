"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useFieldArray } from "react-hook-form";
import { Separator } from "@radix-ui/react-separator";
import { CheckIcon, ChevronDownIcon } from "lucide-react";

type FormSelectPopoverProps<T> = {
  control: any;
  benefitServices: Array<{ label: string; value: string }>;
};

export default function SelectServices<T>({
  control,
  benefitServices,
}: FormSelectPopoverProps<T>) {
  const { fields, append } = useFieldArray({
    name: "coveredServices",
    control: control,
  });

  const { fields: exclusionFields, append: exclusionsAppend } = useFieldArray({
    name: "exclusions",
    control: control,
  });

  return (
    <>
      <p className="font-bold">Specify covered Services </p>
      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          {fields.map((field, index) => (
            <FormField
              control={control}
              key={field.id}
              name={`coveredServices.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex flex-col mb-2">
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Include a Service
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? benefitServices.find(
                                (service) => service.value === field.value
                              )?.label
                            : "Select a service"}
                          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search Service..." />
                        <CommandList>
                          <CommandEmpty>Service not found.</CommandEmpty>
                          <CommandGroup>
                            {benefitServices.map((service) => {
                              return (
                                <CommandItem
                                  key={service.value}
                                  value={service.value}
                                  onSelect={() => field.onChange(service.value)}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      service.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {service.label}
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
            onClick={() => append({ value: "" })}
          >
            Add service
          </Button>
        </div>
        <div>
          {exclusionFields.map((field, index) => (
            <FormField
              control={control}
              key={field.id}
              name={`exclusions.${index}.value`}
              render={({ field }) => (
                <FormItem className="flex flex-col mb-2">
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Exclude a Service
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? benefitServices.find(
                                (service) => service.value === field.value
                              )?.label
                            : "Select a service"}
                          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search Service..." />
                        <CommandList>
                          <CommandEmpty>Service not found.</CommandEmpty>
                          <CommandGroup>
                            {benefitServices.map((service) => {
                              return (
                                <CommandItem
                                  key={service.value}
                                  value={service.value}
                                  onSelect={() => field.onChange(service.value)}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      service.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {service.label}
                                </CommandItem>
                              );
                            })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
            onClick={() => exclusionsAppend({ value: "" })}
          >
            Exclude service
          </Button>
        </div>
      </div>
    </>
  );
}
