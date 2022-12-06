import { Button } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "../../components/Shared/DataTable";
import NewTestResultDialog from "../../components/TestResults/NewTestResultDialog";
import DataContext from "../../contexts/dataContext";
import { getTestResults } from "../../hooks/api";
import { testResultColumns } from "../../models/dataGridColumns";

const TestResultsPage = () => {
  const { testResults, setTestResults } = useContext(DataContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTestResults(pageNumber, pageSize).then((data) => {
      setTestResults(data.data)
      setRowCount(data.total);
      setLoading(false);
    });
  }, [pageNumber, pageSize, setTestResults]);

  const CustomToolBar = () => {
    return (
      <GridToolbarContainer>
        <Button
          variant="text"
          id="add-new-button"
          onClick={() => setDialogOpen(true)}
        >
          New Result
        </Button>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  return (
    <div id="data-table-testresults">
      {testResults && (
        <DataTable
          columns={testResultColumns}
          rows={testResults}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          rowCount={rowCount}
          loading={loading}
          gridToolbar={CustomToolBar}
        />
      )}
      <NewTestResultDialog open={dialogOpen} setOpen={setDialogOpen} />
    </div>
  );
};

export default TestResultsPage;
