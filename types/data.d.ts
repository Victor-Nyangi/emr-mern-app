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
  blood_group: string;
  updated_date: Date;
  is_active: boolean;
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
  updated_date: Date;
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
