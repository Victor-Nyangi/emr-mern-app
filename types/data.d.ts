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
  updated_date: string;
  date_created: string;
  is_active: boolean;
}

export interface Billing {
  _id: string;
  patient_name: string;
  service_charged: string;
  explanation: string;
  amount: number;
  updated_date: date;
}

export interface Department {
  _id: string;
  name: string;
  description: string;
  updated_date: date;
}

export interface Drug {
  _id: string;
  name: string;
  description: string;
  manufacter_date: date;
  expiry_date: date;
  updated_date: date;
}
