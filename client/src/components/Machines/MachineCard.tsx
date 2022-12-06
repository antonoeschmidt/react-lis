import React, { useEffect, useState } from "react";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Machine } from "../../models/machine";
import { dateFormatter } from "../../utils/parsers";

type Props = {
  machine: Machine;
  setSelectedMachine: (machine: Machine) => void;
};

// 20 mins is allowed between status updates before the machine is considered offline
// 1000 ms/s * 60 s/min * 20 min
const RESPONSE_RATE = 1000 * 60 * 20; 

const MachineCard = (props: Props) => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    let latestStatusDate = new Date(props.machine.latestStatus?.timeStamp);
    setOnline((latestStatusDate.getTime() + RESPONSE_RATE) > Date.now());
  }, [props.machine.latestStatus?.timeStamp]);

  const onClick = () => {
    props.setSelectedMachine(props.machine);
  };

  const theme = {
    palette: {
      background: {
        offline: "#D63230", // RED
        online: "#21A179", // GREEN
      },
    },
  };

  return (
    <Card
      sx={{
        minWidth: 200,
        borderColor: online ? theme.palette.background.online : theme.palette.background.offline,
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {online ? "Online" : "Offline"}
        </Typography>
        <Typography variant="h5" component="div">
          {props.machine.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Serial: {props.machine.serialNumber}
        </Typography>
        <Typography variant="body2">
          Last status came:
          <br />
          {dateFormatter(props.machine.latestStatus?.timeStamp)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" variant="text" onClick={() => onClick()}>
          View Statusses
        </Button>
      </CardActions>
    </Card>
  );
};

export default MachineCard;
