//
import React from "react";
import MUIDataTable from "mui-datatables";
import columnsPerf from "./columnsPerf";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

class PerformancesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const url = "api/performances";
    const getData = fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.setState({ data: data });
      })
      .catch((err) => console.log("error:", err));
  }

  render() {
    const { data } = this.state;
    const options = {
      filterType: "textField",
      fixedHeader: true,
      sort: true,
      search: true,
      rowsPerPage: 10,
      selectableRowsHeader: false,
      selectableRows: "none",
      expandableRows: false,
      expandableRowsOnClick: false,
      rowsPerPageOptions: [10, 15, 25, 100],
      jumpToPage: true,
      textLabels: {
        pagination: {
          next: "Next >",
          previous: "< Previous",
          rowsPerPage: "Total items Per Page",
          displayRows: "of",
        },
      },
    };
    return (
      <React.Fragment>
        <Box
          sx={{
            "& .MuiTableCell-head": {
              backgroundColor: "#000000",
              color: "#ffffff",
              borderBottom: "none",
            },
            "& .tss-bd2lw8-MUIDataTableHeadCell-sortActive": {
              color: "#eeebeb",
            },
            "& .css-1qgma8u-MuiButtonBase-root-MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon":
              {
                color: "#eeebeb",
              },
            "& .tss-djbknv-MUIDataTablePagination-navContainer": {
              backgroundColor: "#dedede",
            },
            "& .css-nfmglb-MuiTableCell-root": {
              backgroundColor: "#dedede",
            },
          }}
        >
          {data && (
            <MUIDataTable
              title={
                <div className="tableHeader">
                  Performances
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/performances/add"
                  >
                    <Button variant="outlined" size="medium">
                      Add new performance
                    </Button>
                  </Link>
                </div>
              }
              data={data}
              columns={columnsPerf}
              options={options}
            />
          )}
        </Box>
      </React.Fragment>
    );
  }
}

export default PerformancesTable;
