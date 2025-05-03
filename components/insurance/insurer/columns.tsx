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
import { Badge } from "../../ui/badge";
import Link from "next/link";
import { formatDateFn } from "@/lib/utils";
import { type Insurer } from "@/types/data";

type Contact = {
  phone: string;
  email: string;
  website: string;
  address: string;
};

type Agent = {
  name: string;
  phone: string;
  email: string;
};

export const columns: ColumnDef<Insurer>[] = [
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "panel",
    header: "Panel",
  },
  {
    accessorKey: "payerId",
    header: "Payer Id",
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => {
      const contact: Contact = row.getValue("contact");
      return (
        <div className="flex flex-col text-xs space-x-2">
          <span>{`Phone: ${contact?.phone}}`}</span>
          <span>{`Email: ${contact?.email}`}</span>
          <span>{`Address: ${contact?.address}`}</span>
          <span>{`Website: ${contact?.website}`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "agent",
    header: "Agent",
    cell: ({ row }) => {
      const agent: Agent = row.getValue("agent");
      return (
        <div className="flex flex-col text-xs space-x-2">
          <span>{`Name: ${agent?.name}`}</span>
          <span>{`Phone: ${agent?.phone}`}</span>
          <span>{`Email: ${agent?.email}s`}</span>
        </div>
      );
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
            <Badge
              variant={`${status === "Active" ? "success" : "destructive"}`}
            >
              {status ? "Active" : "Inactive"}
            </Badge>
          }
        </div>
      );
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
      const insurer = row.original;

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
              onClick={() => navigator.clipboard.writeText(insurer._id)}
            >
              Copy Insurer ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/insurance/insurers/${insurer._id}`}>
                View Insurer
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
