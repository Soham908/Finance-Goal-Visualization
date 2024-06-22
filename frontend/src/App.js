import { Box } from "@mui/material";
import DrawerCustom from "./components/DrawerCustom";
import GoalForm from "./components/GoalForm";
import { Route, Routes } from "react-router-dom";
import Finance_Goals from "./pages/Finance_Goals";
import Homepage from "./pages/Homepage";
import Articles from "./pages/Articles";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function App() {
  const [userData, setUserData] = useState("");
  const username = localStorage.getItem('userCredentialGoal')

  useEffect(() => {
    if(!username){
      setUserData("")
    }else setUserData({username})
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <DrawerCustom />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/finance-goals" element={<Finance_Goals />} />
          <Route path="/goal-form" element={<GoalForm />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Box>
    </UserContext.Provider>
  );
}

export default App;
