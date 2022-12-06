import { createContext, useState } from "react";
import { Location } from "../models/location";
import { Machine } from "../models/machine";

export type LocationContextType = {
  locations: Location[];
  setLocations: (locations: Location[]) => void;
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location | null) => void;
  machines: Machine[];
  setMachines: (machines: Machine[]) => void;
};

const LocationContext = createContext<LocationContextType>(null);

export const useLocationContext = (): LocationContextType => {
  const [machines, setMachines] = useState<Machine[]>();
  const [locations, setLocations] = useState<Location[]>();
  const [selectedLocation, setSelectedLocation] = useState<Location>();

  return {
    locations,
    setLocations,
    selectedLocation,
    setSelectedLocation,
    machines,
    setMachines
  };
};

export default LocationContext;
