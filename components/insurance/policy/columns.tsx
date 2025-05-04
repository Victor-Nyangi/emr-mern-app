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
import { Checkbox } from "../../ui/checkbox";
import Link from "next/link";
import { formatDateFn } from "@/lib/utils";
import { type Policy } from "@/types/data";

export const columns: ColumnDef<Policy>[] = [
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
    accessorKey: "policyNumber",
    header: "Policy Number",
  },
  {
    accessorKey: "patientId",
    header: "Patient",
    cell: ({ row }) => {
      const patientId: any = row.getValue("patientId");
      return (
        <div className="flex flex-col text-xs space-x-2">
          <span>{`${patientId?.first_name} ${patientId?.last_name}`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "benefitPlanId",
    header: "Benefit Plan",
    cell: ({ row }) => {
      const benefitPlanId: any = row.getValue("benefitPlanId");
      return (
        <div className="flex flex-col text-xs space-x-2">
          <span>{`Name: ${benefitPlanId?.name}`}</span>
          <span>{`Insurer: ${benefitPlanId?.insurerId?.name}`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "coverageType",
    header: "Coverage Type",
  },
  {
    accessorKey: "effectiveDate",
    header: "Effective From",
    cell: ({ row }) => {
      const effectiveDate: string = row.getValue("effectiveDate");
      return <span>{formatDateFn(effectiveDate)}</span>;
    },
  },
  {
    accessorKey: "expiryDate",
    header: "Expires On",
    cell: ({ row }) => {
      const expiryDate: string = row.getValue("expiryDate");
      return <span>{formatDateFn(expiryDate)}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Added On",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");
      return <span>{formatDateFn(createdAt)}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const policy = row.original;

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
              onClick={() => navigator.clipboard.writeText(policy._id)}
            >
              Copy Policy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/insurance/policies/${policy._id}`}>
                View Policy
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
