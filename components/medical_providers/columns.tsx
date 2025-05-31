"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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
import { MedicalProvider } from "@/types/data";

export const columns: ColumnDef<MedicalProvider>[] = [
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
      const med_provider = row.original;

      return (
        <span>
          {`${med_provider.salutation} ${med_provider.first_name} ${med_provider.last_name}`}
        </span>
      );
    },
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "department",
    header: "Department",
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
      const med_provider = row.original;

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
              onClick={() => navigator.clipboard.writeText(med_provider._id)}
            >
              Copy medical provider ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/medical-providers/${med_provider._id}`}>
                View Medical Provider
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
