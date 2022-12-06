import { GridValueFormatterParams } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models/colDef/gridColDef";
import { dateFormatter } from "../utils/parsers";

export const requestColumns: GridColDef[] = [
  { field: "npn", headerName: "NPN", width: 150 },
  {
    field: "status",
    headerName: "Status",
    type: "singleSelect",
    valueOptions: ["CMP", "NEW", "ANL", "ANP"],
    width: 100,
    editable: true,
  },
  {
    field: "measurementType",
    headerName: "Type",
    description: "This column has a value getter and is not sortable.",
    width: 140,
    editable: false,
  },
  {
    field: "facility",
    headerName: "Facility",
    description: "This column has a value getter and is not sortable.",
    width: 160,
    editable: false,
  },
  {
    field: "createdAt",
    headerName: "Created at",
    width: 190,
    editable: false,
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      if (params.value) return dateFormatter(params.value);
    },
  },
];

export const testResultColumns: GridColDef[] = [
  { field: "npn", headerName: "NPN", width: 150 },
  {
    field: "result",
    headerName: "Result",
    description: "This column has a value getter and is not sortable.",
    editable: false,
    width: 90,
  },
  {
    field: "resultType",
    headerName: "Result Type",
    description: "This column has a value getter and is not sortable.",
    editable: false,
    width: 160,
  },
  {
    field: "sendFacility",
    headerName: "Facility",
    width: 100,
    editable: false,
  },
  {
    field: "sendTime",
    headerName: "Created at",
    width: 190,
    editable: false,
  },
];
