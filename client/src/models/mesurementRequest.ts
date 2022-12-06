export interface MeasurementRequest {
  id: string;
  npn: string;
  status: string;
  createdAt: string;
  modifiedAt: string;
  measurementType: string;
  facility: string;
  notes?: string;
}
