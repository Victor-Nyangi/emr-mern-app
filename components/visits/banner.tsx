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
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" alt={patient.name} />
            <AvatarFallback>
              {patient.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Visit Details</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>ID: {visit.id}</span>
              <span>•</span>
              <span>{patient.name}</span>
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
          <Dialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
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
                  Are you sure you want to cancel this visit? This action cannot
                  be undone.
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

      {/* Visit Summary Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Visit Summary</CardTitle>
            <Badge
              variant={visit.status === "Completed" ? "success" : "default"}
            >
              {visit.status}
            </Badge>
          </div>
          <CardDescription>Details about the patient visit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Date & Time</div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {visit.date}, {visit.time}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Visit Type</div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{visit.type}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{visit.duration}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Doctor</div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{visit.doctor}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Department</div>
              <div>{visit.department}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Location</div>
              <div>{visit.location}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Information */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Patient ID</div>
              <div>{patient.id}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Name</div>
              <div>{patient.name}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Age / Gender</div>
              <div>
                {patient.age} / {patient.gender}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Date of Birth</div>
              <div>{patient.dob}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Contact</div>
              <div>{patient.phone}</div>
              <div className="text-sm">{patient.email}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Insurance</div>
              <div>{patient.insurance}</div>
              <div className="text-sm">ID: {patient.insuranceId}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" asChild>
            <Link
              href={`/patients/${patient.id}`}
              className="flex items-center gap-2"
            >
              View Complete Profile
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default VisitBanner;
