import React from "react";
import "./DataTable.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

type DataTableProps = {
  rows: any;
  columns: any;
  rowCount: number;
  loading: boolean;
  onCellEdit?: (cell: any) => void;
  onCellClick?: (cell: any) => void;
  setPageSize?: (pageSize: number) => void;
  setPageNumber?: (pageNumber: number) => void;
  gridToolbar?: React.JSXElementConstructor<JSX.Element>;
};

const DataTable = (props: DataTableProps) => {
  return (
    <div style={{ height: 800}}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        components={{
          Toolbar: props.gridToolbar ? props.gridToolbar : GridToolbar,
        }}
        onCellEditCommit={props.onCellEdit ? props.onCellEdit : null}
        onCellClick={props.onCellClick ? props.onCellClick : null}
        onPageChange={(pageNumber: number) =>
          props.setPageNumber ? props.setPageNumber(pageNumber + 1) : null
        }
        onPageSizeChange={(pageSize: number) =>
          props.setPageSize ? props.setPageSize(pageSize) : null
        }
        initialState={{
          pagination: { pageSize: 25 },
        }}
        paginationMode="server"
        rowCount={props.rowCount}
        loading={props.loading}
      />
    </div>
  );
};

export default DataTable;
