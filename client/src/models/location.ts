import { Machine } from "./machine";

export interface Address {
  addressLine1: string;
  addressLine2: string;
  postalOrZipCode: number;
  city: string;
  region: string;
  country: string;
}

export interface Location {
  id: number;
  name: string;
  address: Address;
  machines: Machine[];
}
