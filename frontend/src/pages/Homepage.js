import { Grid, Box } from "@mui/material";
import Finance_Goals from "./Finance_Goals";
import Articles from "./Articles";

const Homepage = () => {
  return (
    <Grid container display="flex" component="main">
      <Grid item xs={12} sx={{ background: "blue" }}>
        <Finance_Goals />
      </Grid>

      <Grid item xs={12} sx={{ background: "green" }}>
        <Articles />
      </Grid>
    </Grid>
  );
};

export default Homepage;
