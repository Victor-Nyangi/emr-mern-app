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
  is_active: boolean
}