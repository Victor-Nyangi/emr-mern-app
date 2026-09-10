import { Vital } from "./data";

export type VitalKey = keyof Vital;

export type RangeLabel = "Low" | "Normal" | "High" | "Unknown";

export type Color = "destructive" | "success" | "secondary" | "outline";

export type VitalUIResult = {
  label: string;
  value: string;
  range: RangeLabel;
  color: Color;
};

export type ItemRange = {
  min: number;
  max: number;
};

export type VitalRange = {
  low: ItemRange;
  normal: ItemRange;
  high: ItemRange;
};

export type LoincCoding = {
  system: string;
  code: string;
  display: string;
};

/**
 * Mirrors the shape served by GET /api/v1/vitals/definitions
 * (emr-mern-app-backend/src/data/vitalDefinitions.ts) -- that endpoint is
 * the source of truth; this type just describes what it returns.
 */
export type VitalDefinition = {
  name: string;
  label: string;
  unit: string;
  range: VitalRange;
  loinc?: LoincCoding;
  components?: { name: string; loinc: LoincCoding }[];
};
