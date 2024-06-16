import { Grid, Box } from "@mui/material";
import DrawerCustom from "./components/DrawerCustom";
import GoalForm from "./components/GoalForm";


function App() {

  return (
    <Box sx={{ display: "flex", height: '100vh' }}>
      
      <DrawerCustom />

      <Grid container direction={"column"} sx={{ flexGrow: 1 }} component="main">
        <Grid
          item xs={7.5} md={7.5} lg={7.5} 
        >
          
          {/* <Box>Fin goals</Box> */}
          <GoalForm />
        
        </Grid>
        
        <Grid
          item
          xs={4.5}
          md={4.5}
          lg={4.5}
          sx={{ background: "green"}}
        >
          <Box>Articles</Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
