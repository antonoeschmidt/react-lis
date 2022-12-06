import React, { useContext, useEffect, useState } from "react";
import "./RequestsPage.css";
import DetailedRequest from "../../components/MeasurementRequests/DetailedRequest";
import DataTable from "../../components/Shared/DataTable";
import DataContext from "../../contexts/dataContext";
import { requestColumns } from "../../models/dataGridColumns";
import { MeasurementRequest } from "../../models/mesurementRequest";
import { getRequests, updateRequest } from "../../hooks/api";

const RequestPage = () => {
  const { requests, setRequests } = useContext(DataContext);
  const [selectedRequest, setSelectedRequest] = useState<MeasurementRequest>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRequests(pageNumber, pageSize).then((data) => {
      setRequests(data.data);
      setRowCount(data.total);
      setLoading(false);
    });
  }, [pageNumber, pageSize, setRequests]);

  const onCellClick = (cell: any) => {
    setSelectedRequest(cell.row);
  };

  const onEditCell = (cell: any) => {
    setRequests((prevState) => {
      const newState = prevState.map((req) => {
        if (req.id === cell.id) {
          const updatedRequest = { ...req, status: cell.value };
          updateRequest(updatedRequest);
          return updatedRequest;
        }
        return req;
      });
      return newState;
    });
  };

  return (
    <div className="container">
      <div className="data-table-requests">
        {requests && (
          <DataTable
            columns={requestColumns}
            rows={requests}
            onCellEdit={onEditCell}
            onCellClick={onCellClick}
            setPageNumber={setPageNumber}
            setPageSize={setPageSize}
            rowCount={rowCount}
            loading={loading}
          />
        )}
      </div>
      <div className="detailed-view">{selectedRequest && <DetailedRequest request={selectedRequest} />}</div>
    </div>
  );
};

export default RequestPage;
