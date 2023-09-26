import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import Widget from "components/Widget";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [recordings, setRecordings] = useState([]);

  function getRecordings() {
    axios.get("/api/recordings").then((res) => {
      setRecordings(res.data);
    });
  }

  useEffect(() => {
    getRecordings();
  }, []);

  // Make a set of unique media...
  const composerSet = new Set(recordings.map((p) => p.composer));
  // ... and a sorted array from the set.
  const composerNames = Array.from(composerSet).sort();
  const list = composerNames.length;

  // Make a set of unique catalog numbers...
  const catnumberSet = new Set(recordings.map((p) => p.catalogNumber));
  // ... and a sorted array from the set.
  const catNumbers = Array.from(catnumberSet).sort();
  const list2 = catNumbers.length;

  const artistSet = new Set(recordings.map((p) => p.artists));
  // ... and a sorted array from the set.
  const artistNames = Array.from(artistSet).sort();
  const list3 = artistNames.length;

  const conductorSet = new Set(recordings.map((p) => p.conductor));
  // ... and a sorted array from the set.
  const conductorNames = Array.from(conductorSet).sort();
  const list4 = conductorNames.length;

  const ensembleSet = new Set(recordings.map((p) => p.ensemble));
  // ... and a sorted array from the set.
  const ensembleNames = Array.from(ensembleSet).sort();
  const list5 = ensembleNames.length;

  const compositionSet = new Set(recordings.map((p) => p.composition));
  // ... and a sorted array from the set.
  const compositionNames = Array.from(compositionSet).sort();
  const list6 = compositionNames.length;

  const tapeNumberSet = new Set(recordings.map((p) => p.tapeNumber));
  // ... and a sorted array from the set.
  const tapeNumbers = Array.from(tapeNumberSet).sort();
  const list7 = tapeNumbers.length;

  return (
    <Box className="home">
      <div className="homeContainer">
        <h3>Recordings:</h3>
        <div className="top">
          <div className="left">
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableCell">
                      Unique Composers
                    </TableCell>
                    <TableCell className="tableCell">
                      Unique Catalog Numbers
                    </TableCell>
                    <TableCell className="tableCell">Unique Artists</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {mediaTypes.map((mediaType, index) => ( */}
                  <TableRow>
                    <TableCell className="tableCell">{list}</TableCell>
                    <TableCell className="tableCell">{list2}</TableCell>
                    <TableCell className="tableCell">{list3}</TableCell>
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="right">
            <TableContainer component={Paper} className="table">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableCell">
                      Unique Conductors
                    </TableCell>
                    <TableCell className="tableCell">
                      Unique Ensembles
                    </TableCell>
                    <TableCell className="tableCell">
                      Unique Compositions
                    </TableCell>
                    <TableCell className="tableCell">
                      Unique Tape numbers
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {mediaTypes.map((mediaType, index) => ( */}
                  <TableRow>
                    <TableCell className="tableCell">{list4}</TableCell>
                    <TableCell className="tableCell">{list5}</TableCell>
                    <TableCell className="tableCell">{list6}</TableCell>
                    <TableCell className="tableCell">{list7}</TableCell>
                  </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="bottom">
          <div className="left">left</div>
          <div className="right">right</div>
        </div>
        {/* <div className="widgets">
          <Widget type="compactDisc" />
          <Widget type="cd-r" />
          <Widget type="cassette" />
          <Widget type="lp-albums" />
          <Widget type="reel-to-reel" />
        </div> */}
        <h3>Performances:</h3>
        <div className="widgets">
          <Widget type="composers" />
          <Widget type="compositions" />
          <Widget type="artists" />
          <Widget type="conductors" />
          <Widget type="ensembles" />
          <Widget type="concertHalls" />
          <Widget type="cities" />
          <Widget type="concerts" />
        </div>
      </div>
    </Box>
  );
};
export default Dashboard;
