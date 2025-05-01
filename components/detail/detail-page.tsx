"use client";

import type { ReactNode } from "react";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Edit,
  FileText,
  MoreHorizontal,
  Printer,
  Share2,
  Trash2,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export interface DetailSection {
  title: string;
  content: ReactNode;
}

export interface DetailAction {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export interface DetailPageProps {
  name: string;
  subtitle?: string;
  status?: string;
  statusVariant?: "default" | "destructive" | "outline" | "secondary";
  createdAt?: Date;
  updatedAt?: Date;
  description?: string;
  sections: DetailSection[];
  primaryActions?: DetailAction[];
  secondaryActions?: DetailAction[];
  onEdit?: () => void;
  onDelete?: () => void;
  onPrint?: () => void;
  onShare?: () => void;
}

export function DetailPage({
  name,
  subtitle,
  status,
  statusVariant = "default",
  createdAt,
  updatedAt,
  description,
  sections,
  primaryActions = [],
  secondaryActions = [],
  onEdit,
  onDelete,
  onPrint,
  onShare,
}: DetailPageProps) {
  // Generate initials from the name
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{name}</h1>
                {status && <Badge variant={statusVariant}>{status}</Badge>}
              </div>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 self-end md:self-auto">
            {primaryActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant={action.variant || "default"}
                size="sm"
                className="gap-2"
              >
                {action.icon}
                {action.label}
              </Button>
            ))}

            <div className="flex gap-2">
              {onPrint && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPrint}
                  className="gap-2"
                >
                  <Printer className="h-4 w-4" />
                  <span className="hidden sm:inline">Print</span>
                </Button>
              )}

              {onShare && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onShare}
                  className="gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              )}

              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEdit}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {secondaryActions.map((action, index) => (
                    <DropdownMenuItem key={index} onClick={action.onClick}>
                      {action.icon && (
                        <span className="mr-2">{action.icon}</span>
                      )}
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                  {secondaryActions.length > 0 && onDelete && <Separator />}
                  {onDelete && (
                    <DropdownMenuItem
                      onClick={onDelete}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Metadata */}
            {(createdAt || updatedAt) && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
                {createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Created: {format(createdAt, "PPP")}</span>
                  </div>
                )}
                {updatedAt && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Updated: {format(updatedAt, "PPP")}</span>
                  </div>
                )}
              </div>
            )}

            {/* Sections */}
            <div className="grid gap-6">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-lg font-semibold mb-2">
                    {section.title}
                  </h2>
                  <div>{section.content}</div>
                  {index < sections.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reference ID:{" "}
              {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
