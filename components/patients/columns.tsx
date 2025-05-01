"use client";

import { Patient } from "@/types/data";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { formatDateFn } from "@/lib/utils";

export const columns: ColumnDef<Patient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "first_name",
    header: "Name",
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <span>
          {`${patient.salutation} ${patient.first_name} ${patient.last_name}`}
        </span>
      );
    },
  },
  {
    accessorKey: "date_of_birth",
    header: "Date Of Birth",
    cell: ({ row }) => {
      const date_of_birth: string = row.getValue("date_of_birth");
      const age = formatDistanceToNow(new Date(date_of_birth), {
        addSuffix: false,
      });

      return (
        <div className="flex flex-col text-xs space-x-2">
          <span>{`DOB: ${formatDateFn(date_of_birth)}`}</span>
          <span>{`Age: ${age}`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "updated_date",
    header: "Added On",
    cell: ({ row }) => {
      const updated_date: string = row.getValue("updated_date");

      return <span>{formatDateFn(updated_date)}</span>;
    },
  },
  {
    accessorKey: "is_active",
    header: () => "Status",
    cell: ({ row }) => {
      const status: boolean = row.getValue("is_active");

      return (
        <div className="flex space-x-2">
          {
            <Badge variant={`${status ? "success" : "destructive"}`}>
              {status ? "Active" : "Inactive"}
            </Badge>
          }
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(patient._id)}
            >
              Copy Patient ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/patients/${patient._id}`}>View patient</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
