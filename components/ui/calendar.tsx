"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout="dropdown"
      className={cn("p-2", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-1",
        month: "flex flex-col gap-2",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium text-teal-700",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-6 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-teal-50 hover:border-teal-200"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-0.5",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-7 font-normal text-[0.75rem] text-gray-600",
        row: "flex w-full mt-1",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-7 p-0 font-normal aria-selected:opacity-100 hover:bg-teal-50 hover:text-teal-700 transition-colors"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-teal-600 aria-selected:text-white",
        day_range_end:
          "day-range-end aria-selected:bg-teal-600 aria-selected:text-white",
        day_selected:
          "bg-teal-600 text-white hover:bg-teal-700 hover:text-white focus:bg-teal-700 focus:text-white shadow-sm",
        day_today: "bg-blue-100 text-blue-700 font-semibold",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground opacity-40",
        day_disabled: "text-muted-foreground opacity-30",
        day_range_middle:
          "aria-selected:bg-teal-100 aria-selected:text-teal-700",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-3", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-3", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }
