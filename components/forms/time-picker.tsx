"use client"

import { useState } from "react"
import { Check, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

interface TimePickerProps {
  value?: string
  onChange?: (time: string) => void
  className?: string
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  const [open, setOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState<string>(value || "")

  // Available hours (09 to 17)
  const hours = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9
    return hour < 10 ? `0${hour}` : `${hour}`
  })

  // Available minutes (00, 15, 30, 45)
  const minutes = ["00", "15", "30", "45"]

  // Generate all possible time combinations
  const timeOptions = hours.flatMap((hour) => minutes.map((minute) => `${hour}:${minute}`))

  const handleSelectTime = (time: string) => {
    setSelectedTime(time)
    onChange?.(time)
    setOpen(false)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor="time">Time</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button id="time" variant="outline" role="combobox" aria-expanded={open} className="justify-between w-full">
            {selectedTime ? selectedTime : "Select time..."}
            <Clock className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search time..." />
            <CommandEmpty>No time found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {timeOptions.map((time) => (
                  <CommandItem key={time} value={time} onSelect={() => handleSelectTime(time)}>
                    <Check className={cn("mr-2 h-4 w-4", selectedTime === time ? "opacity-100" : "opacity-0")} />
                    {time}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
