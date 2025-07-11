"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Check, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { formatTimeFn } from "@/lib/utils";

export type Notification = {
  id: string;
  message: string;
  user: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Notification>[] = [
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => {
      const notification = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{notification.message}</span>
          <span className="text-sm text-muted-foreground">
            {formatTimeFn(notification.createdAt)}{" "}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const getVariant = (type: string) => {
        switch (type) {
          case "success":
            return "default";
          case "warning":
            return "secondary";
          case "error":
            return "destructive";
          default:
            return "outline";
        }
      };

      return <Badge variant={getVariant(type)}>{type}</Badge>;
    },
  },
  {
    accessorKey: "read",
    header: "Status",
    cell: ({ row }) => {
      const read = row.getValue("read") as boolean;
      return (
        <Badge variant={read ? "outline" : "default"}>
          {read ? "Read" : "Unread"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const notification = row.original;

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
              onClick={() => navigator.clipboard.writeText(notification.id)}
            >
              Copy notification ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {!notification.read && (
              <DropdownMenuItem>
                <Check className="mr-2 h-4 w-4" />
                Mark as read
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
