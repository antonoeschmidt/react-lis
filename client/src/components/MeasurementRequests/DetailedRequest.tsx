import React, { useContext, useState, useEffect } from "react";
import "./DetailedRequest.css";
import { MeasurementRequest } from "../../models/mesurementRequest";
import {
  Button,
  Grid,
  Stack,
  TextField,
  Card,
  CardContent,
  Typography,
  Snackbar,
} from "@mui/material";
import DataContext from "../../contexts/dataContext";
import { TestResult } from "../../models/testResult";
import { getTestResultsInterpretedByNpn, updateRequest  } from "../../hooks/api";
import { dateFormatter } from "../../utils/parsers";

type DetailedRequestProps = {
  request: MeasurementRequest;
};

const DetailedRequest = (props: DetailedRequestProps) => {
  const { setRequests } = useContext(DataContext);
  const [testResults, setTestResults] = useState<TestResult[]>(null);
  const [notesTextField, setNotesTextField] = useState<string>();
  const [dirty, setDirty] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleChange = (value: string): void => {
    if (!dirty) setDirty(true);
    setNotesTextField(value);
  };

  const onClickSave = (): void => {
     updateRequest({ ...props.request, notes: notesTextField })
      .then(() => {
        setDirty(false);
        setShowSnackbar(true);
        setRequests((prevState) => {
          const newState = prevState.map((req) => {
            if (req.id === props.request.id) {
              const updatedRequest = { ...req, notes: notesTextField };
              return updatedRequest;
            }
            return req;
          })
          return newState;
        })
      })
      .catch(() => {
        alert("Error saving notes");
      });
  };

  useEffect(() => {
    getTestResultsInterpretedByNpn(props.request.npn).then((data) => {
      setTestResults(data)
    })
    setNotesTextField(props.request.notes);
    setDirty(false);
  }, [props.request]);

  return (
    <div>
      <h2>NPN: {props.request.npn}</h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button size="large" variant="contained" fullWidth disabled>
            Test not received
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button size="large" variant="contained" color="error" fullWidth disabled>
            Invalid
          </Button>
        </Grid>
      </Grid>

      <Stack spacing={3} marginTop={4}>
        <TextField
          label="ID"
          value={props.request.id}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="NPN"
          value={props.request.npn}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          label="Status"
          value={props.request.status}
          InputProps={{
            readOnly: true,
          }}
        />
      </Stack>
      <h3>Results</h3>
      <Grid container spacing={2}>
        {testResults &&
          testResults.map(
            (result) =>
              (
                <Grid item xs={6} key={result.id}>
                  <Card>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {result.resultType}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {result.result}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {result.sendFacility}
                      </Typography>
                      <Typography variant="body2">{dateFormatter(result.sendTime)}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
          )}
      </Grid>
      <Grid container spacing={2} style={{ marginTop: "0.5em" }}>
        <Grid item xs={10}>
          <TextField
            label="Notes"
            multiline
            value={notesTextField}
            onChange={(e) => handleChange(e.target.value)}
            fullWidth
            inputProps={{ maxLength: 512 }}
            maxRows={8}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            onClick={onClickSave}
            disabled={!dirty}
            fullWidth
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message="Note saved"
        anchorOrigin={{vertical: 'bottom', horizontal: 'right' }}
      />
    </div>
  );
};

export default DetailedRequest;
