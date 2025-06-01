export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  password2: string;
}

export type PayloadT = {
  [key: string]: any;
};

export interface Patient {
  _id: string;
  salutation: string;
  gender: string;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  date_of_birth: string;
  email: string;
  blood_group: string;
  allergies: string[];
  underlying_conditions: string[];
  medications: Medication[];
  emergency_contact: string;
  updated_date: Date;
  is_active: boolean;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

export interface Appointment {
  patient_id: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  medicalProvider_id: {
    first_name: string;
    last_name: string;
    salutation: string;
    _id: string;
  };
  status: string;
  type: string;
  time: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClinicalNote {
  patient_id: string;
  medicalProvider_id: {
    first_name: string;
    last_name: string;
    salutation: string;
    _id: string;
  };
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Visit {
  _id: string;
  patient_id: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  queueId: {
    _id: string;
    name: string;
  };
  payment_method: string;
  isFollowUp: boolean;
  status: string;
  notes: string;
  visitDate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicalProvider {
  _id: string;
  salutation: string;
  department: string;
  first_name: string;
  last_name: string;
  address: string;
  role: stringl;
  phone_number: string;
  date_of_birth: string;
  email: string;
  updated_date: Date;
  is_active: boolean;
}

export interface Billing {
  _id: string;
  patient_name: string;
  service_charged: string;
  explanation: string;
  amount: number;
  updated_date: Date;
}

export interface Department {
  _id: string;
  name: string;
  description: string;
  updated_date: string;
}

export interface Queue {
  _id: string;
  departmentId: string;
  priority: string;
  status: number;
  assignedTo: string;
  name: string;
  serviceStartTime: Date;
  serviceStartTime: Date;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Drug {
  _id: string;
  name: string;
  description: string;
  manufacter_date: Date;
  expiry_date: Date;
  updated_date: Date;
}

export interface Financial {
  _id: string;
  patient_name: string;
  account_name: string;
  account_number: string;
  account_type: number;
  updated_date: Date;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  charge: Number;
  main_purpose: string;
  updated_date: Date;
}

export interface Insurer {
  _id: string;
  name: string;
  status: string;
  panel: string;
  payerId: string;
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  agent: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface BenefitPlan {
  _id: string;
  name: string;
  description: string;
  insurerId: {
    _id: string;
    name: string;
  };
  coverageType: string;
  coverageDetails: Record<string, ReactNode>;
  costSharing: Record<string, ReactNode>;
  exclusions: Array<string>;
  outOfPocketMax: {
    individual: number;
    family: number;
  };
  coveredServices: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Policy {
  _id: string;
  patientId: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  benefitPlanId: {
    _id: string;
    name: string;
    insurerId: {
      _id: string;
      name: string;
    };
  };
  policyNumber: string;
  coverageType: string;
  effectiveDate: Date;
  expiryDate: Date;
  memberId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vital {
  _id: string;
  patientId: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  visit_id: string;
  body_temperature: string;
  pulse_rate: string;
  respiration_rate: string;
  blood_pressure: string;
  overall_status: string;
  weight: number;
  blood_glucose: string;
  health_status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Diagnosis {
  _id: string;
  medicalProvider_id: {
    first_name: string;
    last_name: string;
    salutation: string;
    _id: string;
  };
  visit_id: string;
  diagnosis: string;
  code: string;
  type: string;
  date: string;
  status: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Test {
  _id: string;
  ordered_by: {
    first_name: string;
    last_name: string;
    salutation: string;
    _id: string;
  };
  visit_id: string;
  testName: string;
  result: string;
  dateOrdered: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VisitMedication {
  _id: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: string;
  duration: string;
  prescribedBy: {
    first_name: string;
    last_name: string;
    salutation: string;
    _id: string;
  };
  patientId: string;
  visitId: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VisitClinicalNote {
  visit_id: string;
  medicalProvider_id: {
    first_name: string;
    last_name: string;
    salutation: string;
    _id: string;
  };
  assessment: string[];
  plan: string[];
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Treatment {
  visitId: string;
  name: string;
  type: "Procedure" | "Periodic" | "Wholesome" | "Other";
  startDate: Date;
  endDate: Date;
  medicalProvider_id: {
    first_name: string;
    last_name: string;
    salutation: string;
    _id: string;
  };
  status: "Scheduled" | "Ongoing" | "Completed" | "Cancelled";
  notes?: string;
  isRecommended: boolean;
  progress: number;
  priority: "Low" | "Medium" | "High" | "Urgent";
}

export interface Invoice {
  visitId: string;
  services_charged?: string[];
  description?: string[];
  payment_mode?: ("COPAY" | "INSURANCE" | "SELF")[];
  amount: number;
  copayAmount: number;
  status?: "PAID" | "UNPAID" | "PENDING INSURANCE REVIEW";
  invoiceNumber: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
