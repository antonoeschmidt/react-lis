import { Address, Location } from "../models/location";
import { Machine, MachineStatus } from "../models/machine";
import { MeasurementRequest } from "../models/mesurementRequest";
import { TestResult } from "../models/testResult";

export const locationParserIncoming = (d: any): Location => {
  return {
    id: d.id,
    name: d.name,
    address: addressParserIncoming(d.address),
    machines: d.machines,
  } as Location;
};

const addressParserIncoming = (d: any): Address => {
  return {
    addressLine1: d.address_line_1,
    addressLine2: d.address_line_2,
    postalOrZipCode: d.postal_or_zip_code,
    city: d.city,
    region: d.region,
    country: d.country,
  } as Address;
};

export const machineParserIncoming = (d: any): Machine => {
  return {
    serialNumber: d.serial_number,
    name: d.name,
    location: d.location,
    modifiedAt: d.modified_at,
    latestStatus: d.latest_status ? machineStatusIncoming(d.latest_status) : "",
  } as Machine;
};

export const machineStatusIncoming = (d: any): MachineStatus => {
  return {
    id: d.id,
    code: d.code,
    message: d.message,
    statusText: d.status_text,
    timeStamp: d.time_stamp,
  } as MachineStatus;
};

export const measurementRequestParserIncoming = (d: any): MeasurementRequest => {
  return {
    id: d.id,
    npn: d.npn,
    status: d.status,
    createdAt: d.created_at,
    modifiedAt: d.modified_at,
    measurementType: d.measurement_type.name,
    facility: d.facility,
    notes: d.notes,
  } as MeasurementRequest;
};

export const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString("da-DK")} at ${date.toLocaleTimeString("da-DK")}`;
};

export const interpretedTestResultParser = (data: any): TestResult[] => {
  let testResults: TestResult[] = [];
  data.results.forEach((d: any) => {
    d.segments.forEach((segment: any) => {
      testResults.push({
        npn: d.npn,
        result: segment.fields[0].value,
        resultType: segment.name,
        sendFacility: d.send_facility,
        sendTime: d.send_time,
      } as TestResult);
    });
  });

  return testResults;
};
