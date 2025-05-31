"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import {
  Calendar,
  Clock,
  FileText,
  User,
  X,
  Printer,
  Edit,
  ChevronRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

type Props = {
  patient: any;
  visit: any;
};

const VisitBanner = ({ patient, visit }: Props) => {
  console.log("Visit Banner Props:", { patient, visit });
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  return (
    <>
      {/* Visit Summary Card */}
      <Card className="mb-5">
        {/* <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Visit Summary</CardTitle>
           
          </div>
          <CardDescription>Details about the patient visit</CardDescription>
        </CardHeader> */}
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start mt-2 mb-4 md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" alt={patient.name} />
                <AvatarFallback>
                  {patient.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{patient.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>ID: {visit._id}</span>
                  <span>•</span>
                  <Badge
                    variant={
                      visit.status === "Completed" ? "success" : "default"
                    }
                  >
                    {visit.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              <Dialog
                open={openCancelDialog}
                onOpenChange={setOpenCancelDialog}
              >
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="gap-2">
                    <X className="h-4 w-4" />
                    Cancel Visit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cancel Visit</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to cancel this visit? This action
                      cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setOpenCancelDialog(false)}
                    >
                      No, keep visit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setOpenCancelDialog(false)}
                    >
                      Yes, cancel visit
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button size="sm" className="gap-2">
                <User className="h-4 w-4" />
                View Patient
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="border-t pt-4 text-sm">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-bold">Visit Details</h3>

                  <div>
                    <div className="text-muted-foreground">
                      {patient.age} / {patient.gender} | ID: {patient._id}
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/patients/${patient._id}`}
                    className="flex items-center gap-2"
                  >
                    View Complete Profile
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {visit.date}, {visit.time} ({visit.duration})
            </div>
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              {visit.doctor} ({visit.department} - {visit.location})
            </div>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};

export default VisitBanner;
