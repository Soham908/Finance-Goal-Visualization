import React from 'react';
import { Grid, Box, Typography } from "@mui/material";
import FinanceGoals from "./FinanceGoals";
import Articles from "./Articles";

const Homepage = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: 'black', minHeight: '100vh' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box sx={{  borderRadius: 2, boxShadow: 3, padding: 2, backgroundColor: "#050505",            border: "1px solid #ddd",
            borderColor: "#847E6A", }}>
            <Typography variant="h5" color="wheat" gutterBottom>
              Your Top Finance Goals
            </Typography>
            <FinanceGoals sliceNum={3} />
          </Box>
        </Grid>

        <Grid item xs={12}>
        <Box sx={{  borderRadius: 2, boxShadow: 3, padding: 2, backgroundColor: "#050505",            border: "1px solid #ddd",
            borderColor: "#847E6A", }}>
            <Typography variant="h5" gutterBottom color='wheat'>
              Recommended Articles
            </Typography>
            <Articles category="house" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
