import React from "react";
import MUIDataTable from "mui-datatables";
import columns from "./columnsRec";
import { Box, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

class RecordingsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      comments: null,
    };
  }

  getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableBodyRow: {
          styleOverrides: {
            root: {
              "&:nth-of-type(odd)": {
                backgroundColor: "rgba(0,0,0,0.04)",
              },
            },
          },
        },
      },
    });

  componentDidMount() {
    const url = "api/recordings";
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
    // console.log("comments", comments);
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
      <ThemeProvider theme={this.getMuiTheme()}>
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
                    Recordings
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/recordings/add"
                    >
                      <Button variant="outlined" size="medium">
                        Add new recording
                      </Button>
                    </Link>
                  </div>
                }
                data={data}
                columns={columns}
                options={options}
              />
            )}
          </Box>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default RecordingsTable;
