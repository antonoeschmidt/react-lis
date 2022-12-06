import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { testResultParserOutgoing, testResultParserIncoming } from "../../utils/testResultParser";
import DataContext from "../../contexts/dataContext";
import { TestResult } from "../../models/testResult";
import { postTestResult } from "../../hooks/api";

type NewTestResultDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type FormData = {
  npn: string;
  resultType: string;
  result: string;
  facility: string;
};

const NewTestResultDialog = (props: NewTestResultDialogProps) => {
  const [formData, setFormData] = useState<FormData>();
  const [dirty, setDirty] = useState(false);
  const { testResults, setTestResults } = useContext(DataContext);

  const handleClose = () => {
    if (dirty) {
      if (window.confirm("Are you sure you want to close? All changes will be lost.")) {
        props.setOpen(false);
        setDirty(false);
        setFormData(null);
      }
    } else {
      props.setOpen(false);
      setFormData(null);
    }
  };

  const onChange = (formData: FormData) => {
    setFormData(formData);
    setDirty(true);
  };

  const handleSubmit = () => {
    if (
      formData?.npn?.length > 0 &&
      formData?.result?.length > 0 &&
      formData?.resultType?.length > 0 &&
      formData?.resultType !== "none" &&
      formData?.facility?.length > 0
    ) {
      const testResult = testResultParserOutgoing(formData);
      postTestResult(testResult)
        .then((res: TestResult) => {
          setTestResults([...testResults, testResultParserIncoming(res)]);
          setFormData(null);
          props.setOpen(false);
          setDirty(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Add New Test Result</DialogTitle>
        <DialogContent>
          <DialogContentText>Input the test result information below.</DialogContentText>
          <form>
            <TextField
              margin="dense"
              fullWidth
              id="npn"
              label="NPN"
              name="npn"
              autoFocus
              required
              onChange={(e) => onChange({ ...formData, npn: e.target.value as string })}
              InputLabelProps={{ shrink: true }}
            />
            <Select
              margin="dense"
              id="resultType"
              labelId="result-type-select-label"
              label="Result Type"
              fullWidth
              required
              defaultValue="none"
              onChange={(e) => onChange({ ...formData, resultType: e.target.value as string })}
            >
              <MenuItem disabled value={"none"}>
                Select a result type
              </MenuItem>
              <MenuItem value={"chlamydia"}>Chlamydia</MenuItem>
              <MenuItem value={"gonorrea"}>Gonorrea</MenuItem>
              <MenuItem value={"sarscov2"}>SARSCoV2</MenuItem>
            </Select>
            <TextField
              margin="dense"
              fullWidth
              id="result"
              label="Result"
              required
              name="result"
              onChange={(e) => onChange({ ...formData, result: e.target.value as string })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              fullWidth
              id="facility"
              label="Facility"
              required
              name="facility"
              onChange={(e) => onChange({ ...formData, facility: e.target.value as string })}
              InputLabelProps={{ shrink: true }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add Result
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewTestResultDialog;
