import React, { useEffect, useState } from "react";
import "./MachineDetails.css";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { Machine, MachineStatus } from "../../models/machine";
import { dateFormatter } from "../../utils/parsers";
import Divider from "@mui/material/Divider";
import { getMachineStatus } from "../../hooks/api";

type Props = {
  machine?: Machine;
};

const MachineDetails = (props: Props) => {
  const [statusMessages, setStatusMessages] = useState<MachineStatus[]>();

  useEffect(() => {
    getMachineStatus(props.machine.location, props.machine.serialNumber).then((data) =>
      setStatusMessages(data)
    );
  }, [props.machine.location, props.machine.serialNumber]);

  return (
    <div className="machine-details">
      <h2>{props.machine.name}</h2>
      <h3>Status messages:</h3>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List>
          {statusMessages &&
            statusMessages.map((status) => (
              <div key={status.id}>
                <ListItem>
                  <ListItemText
                    primary={status.message}
                    secondary={dateFormatter(status.timeStamp)}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
        </List>
      </Box>
    </div>
  );
};

export default MachineDetails;
