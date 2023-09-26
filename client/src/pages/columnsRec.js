import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const handleOpenDelete = () => {
  console.log("Delete has been clicked!");
};

const columns = [
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
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "ensemble",
    label: "Ensemble",
    options: {
      filter: true,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "catalogNumber",
    label: "Catalog Number",
    options: {
      filter: true,
      sort: false,
      display: false,
      viewColumns: false,
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
    name: "media",
    label: "Media",
    options: {
      filter: true,
    },
  },
  {
    name: "location",
    label: "Location",
    options: {
      filter: true,
    },
  },
  {
    name: "actions",
    label: "Actions",
    options: {
      customBodyRender: (value, tableMeta) => {
        return (
          <>
            <IconButton>
              <Link
                style={{ textDecoration: "none" }}
                to={`/recordings/${tableMeta.rowData[0]}`}
              >
                <Visibility sx={{ color: "#2e7d32", fontSize: "20px" }} />
              </Link>
            </IconButton>
            <IconButton>
              <Link
                style={{ textDecoration: "none" }}
                to={`/recordings/edit/${tableMeta.rowData[0]}`}
              >
                <EditIcon sx={{ color: "#1976d2", fontSize: "20px" }} />
              </Link>
            </IconButton>
            <IconButton>
              <Link
                style={{ textDecoration: "none" }}
                to={`/recordings/delete/${tableMeta.rowData[0]}`}
              >
                <DeleteForeverIcon
                  sx={{ color: "#c62828", fontSize: "20px" }}
                  // onClick={() => handleOpenDelete(tableMeta.rowData[0])}
                />
              </Link>
            </IconButton>
          </>
        );
      },
    },
  },
];

export default columns;
