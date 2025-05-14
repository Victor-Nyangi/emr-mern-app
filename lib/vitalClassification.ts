import { Vital } from "@/types/data";
import {
  Color,
  RangeLabel,
  VitalDefinition,
  VitalKey,
  VitalUIResult,
} from "@/types/vitals";

const vitalDefinitions: VitalDefinition[] = [
  {
    name: "blood_pressure",
    label: "Blood Pressure",
    unit: "mmHg",
    range: [
      {
        low: { min: 0, max: 89 }, // Hypotension (systolic < 90)
        normal: { min: 90, max: 119 }, // Normal (systolic 90–119)
        high: { min: 120, max: 180 }, // Hypertension (systolic ≥ 120)
      },
    ],
  },
  {
    name: "pulse_rate",
    label: "Heart Rate",
    unit: "bpm",
    range: [
      {
        low: { min: 0, max: 59 }, // Bradycardia (< 60 bpm)
        normal: { min: 60, max: 100 }, // Normal (60–100 bpm)
        high: { min: 101, max: 200 }, // Tachycardia (> 100 bpm)
      },
    ],
  },
  {
    name: "body_temperature",
    label: "Temperature",
    unit: "°F",
    range: [
      {
        low: { min: 90.0, max: 95.9 }, // Hypothermia
        normal: { min: 96.0, max: 99.5 }, // Normal body temp
        high: { min: 99.6, max: 106.0 }, // Fever or Hyperthermia
      },
    ],
  },
  {
    name: "respiration_rate",
    label: "Respiratory Rate",
    unit: "breaths/min",
    range: [
      {
        low: { min: 0, max: 11 }, // Bradypnea (< 12)
        normal: { min: 12, max: 20 }, // Normal
        high: { min: 21, max: 40 }, // Tachypnea (> 20)
      },
    ],
  },
  {
    name: "weight",
    label: "Weight",
    unit: "lbs",
    range: [
      {
        low: { min: 0, max: 90 }, // Underweight for adults
        normal: { min: 91, max: 200 }, // General adult range
        high: { min: 201, max: 400 }, // Overweight/obese
      },
    ],
  },
];

export const classifyVitalsForUI = (vitalData: Vital): VitalUIResult[] => {
  const getColor = (range: RangeLabel): Color => {
    switch (range) {
      case "Low":
        return "secondary";
      case "Normal":
        return "success";
      case "High":
        return "destructive";
      default:
        return "outline";
    }
  };

  return vitalDefinitions.map(({ name, label, unit, range }) => {
    const rawValue = vitalData[name as VitalKey];

    if (rawValue == null) {
      return { label, value: "N/A", range: "Unknown", color: "outline" };
    }

    let numericValue: number;

    if (name === "blood_pressure" && typeof rawValue === "string") {
      const [systolicStr] = rawValue.split("/");
      numericValue = parseInt(systolicStr, 10);
    } else {
      if (typeof rawValue === "number") {
        numericValue = rawValue;
      } else if (typeof rawValue === "string") {
        numericValue = parseFloat(rawValue);
      } else {
        throw new Error(
          `Invalid rawValue type for vital "${name}": ${typeof rawValue}`
        );
      }
    }

    const { low, normal, high } = range[0];

    let rangeLabel: RangeLabel = "Unknown";

    if (numericValue >= low.min && numericValue <= low.max) {
      rangeLabel = "Low";
    } else if (numericValue >= normal.min && numericValue <= normal.max) {
      rangeLabel = "Normal";
    } else if (numericValue >= high.min && numericValue <= high.max) {
      rangeLabel = "High";
    }

    return {
      label,
      value: `${rawValue} ${unit}`,
      range: rangeLabel,
      color: getColor(rangeLabel),
    };
  });
};
