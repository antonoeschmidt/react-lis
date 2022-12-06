export interface TestResult {
    id?: string;
    npn: string;
    result: string;
    resultType: string;
    sendFacility: string;
    sendTime: string;
    messageType?: string;
    patientIds?: any[];
    parsedData?: any;
}