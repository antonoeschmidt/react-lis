import React, { useEffect, useContext, useState } from "react";
import "./Dashboard.css";
import MachineCard from "../../components/Machines/MachineCard";
import LocationContext from "../../contexts/locationContext";
import MachineDetails from "../../components/Machines/MachineDetails";
import { Machine } from "../../models/machine";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { getLocations, getMachines } from "../../hooks/api";

const Dashboard = () => {
  const { machines, locations, selectedLocation, setSelectedLocation, setLocations, setMachines } =
    useContext(LocationContext);
  const [selectedMachine, setSelectedMachine] = useState<Machine>();

  useEffect(() => {
    getLocations().then((data) => {
      setLocations(data);
      if (!selectedLocation) setSelectedLocation(data[0]);
    });
    if (selectedLocation) getMachines(selectedLocation.id).then((data) => setMachines(data));
  }, [selectedLocation, setLocations, setMachines, setSelectedLocation]);

  const handleLocationChange = (e: SelectChangeEvent<string>) => {
    setSelectedMachine(null);
    const location = locations.find((location) => location.id === Number(e.target.value));
    if (location) setSelectedLocation(location);
  };

  return (
    <div className="main-page">
      <div className="locations">
        <h1>Machine Status</h1>
        <Select
          label="Location"
          value={selectedLocation ? String(selectedLocation.id) : ""}
          onChange={handleLocationChange}
        >
          {locations &&
            locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
        </Select>
        <div className="card-grid">
          {machines &&
            machines.map((machine) => (
              <MachineCard
                key={machine.serialNumber}
                machine={machine}
                setSelectedMachine={setSelectedMachine}
              />
            ))}
        </div>
      </div>
      {selectedMachine && <MachineDetails machine={selectedMachine} />}
    </div>
  );
};

export default Dashboard;
