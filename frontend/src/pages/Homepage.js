import { Grid, Box } from "@mui/material";
import Finance_Goals from "./Finance_Goals";
import Articles from "./Articles";

const Homepage = () => {
  return (
    <Grid container display="flex" component="main">
      <Grid container item>
        <Grid item xs={12} sx={{ background: "blue" }}>
          <Finance_Goals sliceNum={3} />
        </Grid>
      </Grid>
      <Grid container item>
        <Grid item xs={12} sx={{ background: "green" }}>
          <Articles sliceNum={4} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Homepage;
