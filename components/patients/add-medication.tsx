"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, PlusCircle, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { frequencyOptions } from "@/lib/data";
import { PATIENTS_ENDPOINT } from "@/utilities/endpoints";
import { postData } from "@/utilities/api";
import ResponsiveDialog from "../shared/ResponsiveDrawer";
import { Medication } from "@/types/data";

const AddMedicationForm = ({ patientId }: { patientId: String }) => {
  const [isLoading, setIsLoading] = useState(false);

  // State for the list of medications
  const [medications, setMedications] = useState<Medication[]>([]);

  // State for the current medication being added
  const [currentMed, setCurrentMed] = useState<Medication>({
    name: "",
    dosage: "",
    frequency: "",
  });

  // Handle input changes
  const handleInputChange = (field: keyof Medication, value: string) => {
    setCurrentMed({
      ...currentMed,
      [field]: value,
    });
  };

  // Add a medication to the list
  const addMedication = () => {
    // Basic validation
    if (!currentMed.name || !currentMed.dosage || !currentMed.frequency) {
      toast.error("Missing information", {
        description: "Please fill in all fields before adding a medication.",
      });
      return;
    }

    // Add the medication to the list
    setMedications([...medications, { ...currentMed }]);

    // Reset the form
    setCurrentMed({
      name: "",
      dosage: "",
      frequency: "",
    });

    toast.info("Medication added", {
      description: `${currentMed.name} has been added to the list.`,
    });
  };

  // Remove a medication from the list
  const removeMedication = (index: number) => {
    const updatedMeds = [...medications];
    updatedMeds.splice(index, 1);
    setMedications(updatedMeds);

    toast.info("Medication removed", {
      description: "The medication has been removed from the list.",
    });
  };

  // Save all medications
  const saveMedications = async () => {
    const payload = {
      medications: medications,
    };
    try {
      const response = await postData(
        `${PATIENTS_ENDPOINT}${patientId}`,
        payload,
        "PATCH"
      );
      if (response?._id) {
        toast.success("Medications saved", {
          description: `Successfully saved ${medications.length} medications.`,
        });
      } else {
        toast.error("Submission Error", {
          description: "Error submitting request! Please try again.",
        });
      }
    } catch (error) {
      toast.error("Submission Error", {
        description: (error as Error)?.message || "An error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <ResponsiveDialog
        actionLabel="Add Medication"
        title="Medication Management"
        description="Add, edit, or remove patient medications."
      >
        <div className="sm:px-1 px-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="med-name">Medication Name</Label>
                <Input
                  id="med-name"
                  placeholder="Enter medication name"
                  value={currentMed.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="med-dosage">Dosage</Label>
                <Input
                  id="med-dosage"
                  placeholder="e.g., 10mg, 500mcg"
                  value={currentMed.dosage}
                  onChange={(e) => handleInputChange("dosage", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="med-frequency">Frequency</Label>
                <Select
                  value={currentMed.frequency}
                  onValueChange={(value) =>
                    handleInputChange("frequency", value)
                  }
                >
                  <SelectTrigger id="med-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={addMedication}
              className="w-full md:w-auto"
              type="button"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Medication
            </Button>
          </div>
          {/* Medications list */}
          <div className="py-2">
            <h3 className="text-lg text-info font-medium mb-2">Current Medications</h3>
            {medications.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medications.map((med, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell>{med.dosage}</TableCell>
                      <TableCell>{med.frequency}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMedication(index)}
                          aria-label={`Remove ${med.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No medications added yet.
              </div>
            )}
          </div>
          <div>
            <Button
              onClick={saveMedications}
              disabled={isLoading || medications.length === 0}
              className="ml-auto"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save Medications
            </Button>
          </div>
        </div>
      </ResponsiveDialog>
    </>
  );
};

export default AddMedicationForm;
