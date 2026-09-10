import { Vital } from "@/types/data";
import {
  Color,
  RangeLabel,
  VitalDefinition,
  VitalKey,
  VitalUIResult,
} from "@/types/vitals";

/**
 * Unit and reference-range knowledge for vital signs now lives server-side
 * (GET /api/v1/vitals/definitions, emr-mern-app-backend/src/data/vitalDefinitions.ts)
 * and is the authoritative source. Callers fetch it and pass it in here rather
 * than this module keeping its own copy.
 */
export const classifyVitalsForUI = (
  vitalData: Vital,
  vitalDefinitions: VitalDefinition[]
): VitalUIResult[] => {
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

    const { low, normal, high } = range;

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
