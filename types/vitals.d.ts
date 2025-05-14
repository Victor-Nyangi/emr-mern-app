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

export type VitalDefinition = {
  name: string;
  label: string;
  unit: string;
  range: [{ low: ItemRange; normal: ItemRange; high: ItemRange }];
};
