import { render, screen} from "@testing-library/react";
import MachineCard from "../../components/Machines/MachineCard";
import { Machine, MachineStatus } from "../../models/machine";

// Setup
let date = new Date();
let machine = {
  serialNumber: 123,
  name: "Test",
  location: 1,
  modifiedAt: date.toISOString(),
  latestStatus: {
    id: "1",
    code: "ok",
    message: "test",
    statusText: "testtext",
    timeStamp: date.toISOString(),
  } as MachineStatus,
} as Machine;
const setSelectedMachine = () => {};

/*
* Tests if Machine Cards renders correctly depending on
* the latest status of the corresponding machine
*/

test("Online machine card should render", () => {
  render(
    <MachineCard
      key={machine.serialNumber}
      machine={machine}
      setSelectedMachine={setSelectedMachine}
    />
  );
  expect(screen.getByText("Online")).toBeInTheDocument();
});

test('Offline machine card should render', () => { 
    date.setHours(date.getHours() - 1);
    machine.latestStatus.timeStamp = date.toISOString();
    render(
      <MachineCard
        key={machine.serialNumber}
        machine={machine}
        setSelectedMachine={setSelectedMachine}
      />
    );
    expect(screen.getByText("Offline")).toBeInTheDocument();
 })