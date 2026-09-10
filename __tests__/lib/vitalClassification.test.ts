import { classifyVitalsForUI } from "@/lib/vitalClassification";
import { VitalDefinition } from "@/types/vitals";
import { Vital } from "@/types/data";

const definitions: VitalDefinition[] = [
  {
    name: "pulse_rate",
    label: "Heart Rate",
    unit: "bpm",
    range: {
      low: { min: 0, max: 59 },
      normal: { min: 60, max: 100 },
      high: { min: 101, max: 200 },
    },
    loinc: { system: "http://loinc.org", code: "8867-4", display: "Heart rate" },
  },
  {
    name: "blood_pressure",
    label: "Blood Pressure",
    unit: "mmHg",
    range: {
      low: { min: 0, max: 89 },
      normal: { min: 90, max: 119 },
      high: { min: 120, max: 180 },
    },
    loinc: {
      system: "http://loinc.org",
      code: "85354-9",
      display: "Blood pressure panel",
    },
    components: [
      {
        name: "systolic",
        loinc: { system: "http://loinc.org", code: "8480-6", display: "Systolic blood pressure" },
      },
      {
        name: "diastolic",
        loinc: { system: "http://loinc.org", code: "8462-4", display: "Diastolic blood pressure" },
      },
    ],
  },
];

const baseVital: Partial<Vital> = {
  _id: "v1",
  visit_id: "visit1",
};

describe("classifyVitalsForUI", () => {
  it("classifies a value within the normal band", () => {
    const vital = { ...baseVital, pulse_rate: "75" } as Vital;

    const [result] = classifyVitalsForUI(vital, [definitions[0]]);

    expect(result).toEqual({
      label: "Heart Rate",
      value: "75 bpm",
      range: "Normal",
      color: "success",
    });
  });

  it("classifies a value within the low band", () => {
    const vital = { ...baseVital, pulse_rate: "45" } as Vital;

    const [result] = classifyVitalsForUI(vital, [definitions[0]]);

    expect(result.range).toBe("Low");
    expect(result.color).toBe("secondary");
  });

  it("classifies a value within the high band", () => {
    const vital = { ...baseVital, pulse_rate: "150" } as Vital;

    const [result] = classifyVitalsForUI(vital, [definitions[0]]);

    expect(result.range).toBe("High");
    expect(result.color).toBe("destructive");
  });

  it("reads only the systolic figure out of a blood_pressure string", () => {
    const vital = { ...baseVital, blood_pressure: "130/85" } as Vital;

    const [result] = classifyVitalsForUI(vital, [definitions[1]]);

    expect(result.value).toBe("130/85 mmHg");
    expect(result.range).toBe("High");
  });

  it("returns Unknown/N-A when the value is missing", () => {
    const vital = { ...baseVital } as Vital;

    const [result] = classifyVitalsForUI(vital, [definitions[0]]);

    expect(result).toEqual({
      label: "Heart Rate",
      value: "N/A",
      range: "Unknown",
      color: "outline",
    });
  });

  it("returns Unknown when a value falls outside every band", () => {
    const vital = { ...baseVital, pulse_rate: "-5" } as Vital;

    const [result] = classifyVitalsForUI(vital, [definitions[0]]);

    expect(result.range).toBe("Unknown");
    expect(result.color).toBe("outline");
  });

  it("uses the definitions passed in, not a built-in copy", () => {
    const customDefinition: VitalDefinition = {
      ...definitions[0],
      unit: "custom-unit",
      range: {
        low: { min: 0, max: 0 },
        normal: { min: 1, max: 1000 },
        high: { min: 1001, max: 2000 },
      },
    };
    const vital = { ...baseVital, pulse_rate: "75" } as Vital;

    const [result] = classifyVitalsForUI(vital, [customDefinition]);

    expect(result.value).toBe("75 custom-unit");
    expect(result.range).toBe("Normal");
  });
});
