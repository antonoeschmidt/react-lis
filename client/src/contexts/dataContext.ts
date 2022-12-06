import { createContext, useState } from "react";
import { MeasurementRequest } from "../models/mesurementRequest";
import { TestResult } from "../models/testResult";

export type DataContextType = {
  testResults: TestResult[];
  setTestResults: React.Dispatch<React.SetStateAction<TestResult[]>>;
  requests: MeasurementRequest[];
  setRequests: React.Dispatch<React.SetStateAction<MeasurementRequest[]>>;
  testResultsInterpreted: TestResult[];
  setTestResultsInterpreted: React.Dispatch<React.SetStateAction<TestResult[]>>;
};

const DataContext = createContext<DataContextType>(null);

export const useDataContext = (): DataContextType => {
  const [testResults, setTestResults] = useState<TestResult[]>();
  const [testResultsInterpreted, setTestResultsInterpreted] = useState<TestResult[]>();
  const [requests, setRequests] = useState<MeasurementRequest[]>();

  return {
    testResults,
    setTestResults,
    requests,
    setRequests,
    testResultsInterpreted,
    setTestResultsInterpreted
  };
};

export default DataContext;
