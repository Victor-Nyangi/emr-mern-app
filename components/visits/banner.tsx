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
  User,
  X,
  Printer,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Patient, Visit } from "@/types/data";
import { format, formatDistanceToNow } from "date-fns";
import { constructUserName } from "@/lib/utils";
import { toast } from "sonner";
import { VISITS_ENDPOINT } from "@/utilities/endpoints";
import { postData } from "@/utilities/api";
import { useRouter } from "next/navigation";
import TransitionVisit from "./transition-visit";

type Props = {
  patient: Patient;
  visit: Visit;
};

const transitionEnum = {
  cancel: "CANCELLED",
  complete: "COMPLETED",
  transition: "IN PROGRESS",
};

const StatusEnum: Record<
  string,
  "default" | "destructive" | "success" | "secondary" | "outline" | "warning"
> = {
  CANCELLED: "destructive",
  "IN PROGRESS": "success",
  COMPLETED: "success",
  STALE: "secondary",
  ARRIVED: "default",
};

const VisitBanner = ({ patient, visit }: Props) => {
  const patientName = `${patient?.first_name} ${patient?.last_name}`;
  const patientAge = formatDistanceToNow(new Date(patient?.date_of_birth), {
    addSuffix: false,
  });
  const router = useRouter();

  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openCompleteDialog, setOpenCompleteDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const transitionVisit = async (transitionType: string) => {
    const status =
      transitionEnum[transitionType as keyof typeof transitionEnum];
    const payload = {
      status: status,
    };
    try {
      const response = await postData(
        `${VISITS_ENDPOINT}transition/${visit._id}`,
        payload,
        "PATCH"
      );
      if (response?._id) {
        toast.success(`Visit Successfully ${status.toLowerCase()}d`);

        router.push("/visits");
      } else {
        toast.error("Submission Error", {
          description: "Error in submitting request! Please try again.",
        });
      }
    } catch (error) {
      toast.error("Submission Error", {
        description: (error as Error)?.message || "An error occurred.",
      });
    } finally {
      setIsLoading(false);
      if (transitionType === "complete") {
        setOpenCompleteDialog(false);
      } else {
        setOpenCancelDialog(false);
      }
    }
  };
  return (
    <>
      {/* Visit Summary Card */}
      <Card className="mb-5">
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start mt-2 mb-4 md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" alt={patientName} />
                <AvatarFallback>
                  {patientName
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{patientName}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>ID: {visit._id}</span>
                  <span>•</span>
                  <Badge
                    variant={
                      StatusEnum[visit.status as keyof typeof StatusEnum]
                    }
                  >
                    {visit.status}
                  </Badge>
                </div>
              </div>
            </div>

            {!["CANCELLED", "COMPLETED"].includes(visit.status) && (
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                {visit.status === "IN PROGRESS" && (
                  <Dialog
                    open={openCompleteDialog}
                    onOpenChange={setOpenCompleteDialog}
                  >
                    <DialogTrigger asChild>
                      <Button variant="success" size="sm" className="gap-2">
                        End Visit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Complete Visit</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to complete this visit? This
                          action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setOpenCompleteDialog(false)}
                        >
                          No, keep visit
                        </Button>
                        <Button
                          variant="default"
                          disabled={isLoading}
                          onClick={() => transitionVisit("complete")}
                        >
                          {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Yes, complete visit
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                {["ARRIVED", "STALE"].includes(visit.status) && (
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
                          Are you sure you want to cancel this visit? This
                          action cannot be undone.
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
                          disabled={isLoading}
                          onClick={() => transitionVisit("cancel")}
                        >
                          Yes, cancel visit
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="border-t pt-4 text-sm">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-bold">Visit Details</h3>

                  <div>
                    <div className="text-muted-foreground">
                      {patientAge} / {patient.gender} | ID: {patient?._id}
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/patients/${patient._id}`}
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    View Complete Profile
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {visit?.visitDate && (
                <span>{format(visit?.visitDate, "yyyy-MM-dd")}</span>
              )}
            </div>
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              {visit?.currentQueue ? (
                <span>
                  {constructUserName(visit?.currentQueue?.assignedTo)} (
                  {visit.currentQueue?.departmentId?.name})
                </span>
              ) : (
                <span>-</span>
              )}
            </div>
            <TransitionVisit
              visitId={visit?._id}
              visitCurrentQueue={visit?.currentQueue?._id}
            />
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};

export default VisitBanner;
