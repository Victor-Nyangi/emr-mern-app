"use client";

import { Visit } from "@/types/data";
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

const StatusEnum: Record<
  string,
  "default" | "destructive" | "success" | "secondary" | "outline" | "warning"
> = {
  CANCELLED: "destructive",
  "IN PROGRESS": "outline",
  COMPLETED: "success",
  STALE: "secondary",
  ARRIVED: "default",
};

export const columns: ColumnDef<Visit>[] = [
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
      const visit = row.original;

      return (
        <span>
          {`${visit?.patient_id?.first_name} ${visit?.patient_id?.last_name}`}
        </span>
      );
    },
  },
  {
    accessorKey: "currentQueue",
    header: "Queue",
    cell: ({ row }) => {
      const visit = row.original;

      return <span>{`${visit?.currentQueue?.name}`}</span>;
    },
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
  },

  {
    accessorKey: "createdAt",
    header: "Created On",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");

      return <span>{formatDateFn(createdAt)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: () => "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      return (
        <div className="flex space-x-2">
          {
            <Badge variant={StatusEnum[status as keyof typeof StatusEnum]}>
              {status}
            </Badge>
          }
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const visit = row.original;

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
              onClick={() => navigator.clipboard.writeText(visit._id)}
            >
              Copy Visit ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/visits/${visit._id}`}>View visit</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
