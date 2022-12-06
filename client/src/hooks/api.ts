import { Machine, MachineStatus } from "../models/machine";
import { Location } from "../models/location";
import { MeasurementRequest } from "../models/mesurementRequest";
import { TestResult } from "../models/testResult";
import { testResultParserIncoming } from "../utils/testResultParser";
import {
  interpretedTestResultParser,
  locationParserIncoming,
  machineParserIncoming,
  machineStatusIncoming,
  measurementRequestParserIncoming,
} from "../utils/parsers";

interface PaginatedResult<T> {
  data: T;
  total: number;
}

const fetchApi = async (path: string, method: string = "GET", body?: any) => {
  let headers: any = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  if (method === "POST" || method === "PATCH") {
    headers = {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  let options: RequestInit = {
    method,
    headers,
  };
  if (body) {
    options = { ...options, body: JSON.stringify(body) };
  }

  try {
    const response = await fetch(`${(window as any)._env_.REACT_APP_BACKEND}/api/${path}`, options);
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMachineStatus = async (location: number, serialNumber: number): Promise<MachineStatus[]> => {
  const data = await fetchApi(`locations/${location}/machines/${serialNumber}/statuses`);
  return data.results.map((d: any) => machineStatusIncoming(d));
};

export const getMachines = async (locationId: number): Promise<Machine[]> => {
  const data = await fetchApi(`locations/${locationId}/machines?include-latest-machine-status=true`);
  return data.results.map((d: any) => machineParserIncoming(d));
};

export const getLocations = async (): Promise<Location[]> => {
  const data = await fetchApi("locations/");
  return data.results.map((d: any) => locationParserIncoming(d));
};

export const getRequests = async (
  pageNumber: number,
  pageSize: number
): Promise<PaginatedResult<MeasurementRequest[]>> => {
  const data = await fetchApi(`measurements/requests?page=${pageNumber}&page-size=${pageSize}`);
  const parsedData = data.results.map((d: any) => measurementRequestParserIncoming(d));
  return { data: parsedData, total: data.total };
};

export const getTestResultsInterpreted = async (): Promise<TestResult[]> => {
  const data = await fetchApi(`measurements/results/interpreted`);
  return interpretedTestResultParser(data)
}

export const getTestResultsInterpretedByNpn = async (npn: string): Promise<TestResult[]> => {
  const data = await fetchApi(`measurements/results/interpreted?npn=${npn}`);
  return interpretedTestResultParser(data)
}

export const getTestResults = async (
  pageNumber: number,
  pageSize: number
): Promise<PaginatedResult<TestResult[]>> => {
  const data = await fetchApi(`measurements/results?page=${pageNumber}&page-size=${pageSize}`);
  const parsedData = data.results.map((d: any) => testResultParserIncoming(d));
  return { data: parsedData, total: data.total };
};

export const getTestResultsByNpn = async (npn: string): Promise<TestResult[]> => {
  const data = await fetchApi(`measurements/results?npn=${npn}`);
  return data.results.map((d: any) => testResultParserIncoming(d));
};

export const updateRequest = async (request: MeasurementRequest) => {
  const data = await fetchApi(`measurements/requests/${request.id}`, "PATCH", request);
  return data;
};

export const postTestResult = async (testResult: any): Promise<TestResult> => {
  const data = (await fetchApi(`measurements/results`, "POST", testResult)) as TestResult;
  return data;
};
