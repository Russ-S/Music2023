import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      className="home"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginTop="250px"
    >
      <Typography variant="h3" fontWeight="bold" className="mainTitle">
        Classical Music Collection & Performance Catalog 2023
      </Typography>
      <Typography variant="h5" fontWeight={"bold"} className="mainSubtitle">
        Version 10.1
      </Typography>
    </Box>
  );
};

export default Home;
