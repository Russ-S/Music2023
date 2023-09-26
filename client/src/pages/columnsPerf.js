import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const datas = [
  {
    name: "_id",
    label: "ID",
    options: { display: "excluded" },
  },
  {
    name: "composer",
    label: "Composer",
    options: {
      filter: true,
    },
  },
  {
    name: "composition",
    label: "Composition",
    options: {
      filter: true,
    },
  },
  {
    name: "artists",
    label: "Artists",
    options: {
      filter: true,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "conductor",
    label: "Conductor",
    options: {
      filter: true,
      sort: true,
      display: false,
      viewColumns: true,
    },
  },
  {
    name: "ensemble",
    label: "Ensemble",
    options: {
      filter: true,
      sort: true,
      display: false,
      viewColumns: true,
    },
  },
  {
    name: "workCategory",
    label: "Category",
    options: {
      filter: true,
    },
  },
  {
    name: "concertHall",
    label: "Concert Hall",
    options: {
      filter: true,
      sort: true,
      display: false,
      viewColumns: true,
    },
  },
  {
    name: "city",
    label: "City",
    options: {
      filter: true,
      sort: true,
      display: true,
      viewColumns: true,
    },
  },
  {
    name: "performanceDate",
    label: "Performance Date",
    options: {
      filter: true,
      sort: true,
      display: true,
      viewColumns: true,
      customBodyRender: (value) => {
        if (!value) return "-";
        return format(new Date(value), "MM-dd-yyyy");
      },
    },
  },

  {
    name: "Actions",
    options: {
      customBodyRender: (value, tableMeta) => {
        return (
          <>
            <IconButton>
              <Link
                style={{ textDecoration: "none" }}
                to={`/performances/${tableMeta.rowData[0]}`}
              >
                <Visibility sx={{ color: "#2e7d32", fontSize: "20px" }} />
              </Link>
            </IconButton>
            <IconButton>
              <Link
                style={{ textDecoration: "none" }}
                to={`/performances/edit/${tableMeta.rowData[0]}`}
              >
                <EditIcon sx={{ color: "#1976d2", fontSize: "20px" }} />
              </Link>
            </IconButton>
          </>
        );
      },
    },
  },
];

export default datas;
