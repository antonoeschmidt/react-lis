export interface Machine {
    serialNumber: number;
    name: string;
    location: number;
    modifiedAt: string;
    latestStatus?: MachineStatus
}

export interface MachineStatus {
    id: string;
    machineSerial?: string;
    code: string;
    message: string;
    statusText: string;
    timeStamp: string;
}