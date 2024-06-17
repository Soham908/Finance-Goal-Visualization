import { Grid, Box } from "@mui/material";
import DrawerCustom from "./components/DrawerCustom";
import GoalForm from "./components/GoalForm";
import { Route, Routes } from "react-router-dom";
import Finance_Goals from "./pages/Finance_Goals";
import Homepage from "./pages/Homepage";
import Articles from "./pages/Articles";
import ComplexLayout from "./components/TrialLayout";


function App() {

  return (
    <Box sx={{ display: "flex", height: '100vh' }}>
      
      <DrawerCustom />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/finance-goals" element={<Finance_Goals />} />
        <Route path="/goal-form" element={<GoalForm />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
      {/* <Homepage /> */}
    </Box>
  );
}

export default App;
