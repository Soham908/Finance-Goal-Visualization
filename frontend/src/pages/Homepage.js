import { Grid, Box } from "@mui/material";
import Finance_Goals from "./Finance_Goals";
import Articles from "./Articles";

const Homepage = () => {
  return (
    <Grid container direction="column" sx={{ flexGrow: 1, height: '100%' }} component="main">
      <Grid item xs={7.5} md={7.5} lg={7.5} sx={{ background: "blue" }}>
        <Finance_Goals />
      </Grid>

      <Grid item xs={4.5} md={4.5} lg={4.5} sx={{ background: "green" }}>
        <Articles />
      </Grid>
    </Grid>
  );
};

export default Homepage;
