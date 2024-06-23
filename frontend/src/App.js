import { Box } from "@mui/material";
import DrawerCustom from "./components/DrawerCustom";
import GoalForm from "./components/GoalForm";
import { Route, Routes } from "react-router-dom";
import FinanceGoals from "./pages/FinanceGoals";
import Homepage from "./pages/Homepage";
import Articles from "./pages/Articles";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { createContext, useEffect, useState } from "react";
import ArticlePage from "./components/ArticlePage";

export const UserContext = createContext();

function App() {
  const [userData, setUserData] = useState("");
  const username = localStorage.getItem("userCredentialGoal");

  useEffect(() => {
    if (!username) {
      setUserData("");
    } else setUserData({ username });
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Box sx={{ display: "flex",  backgroundColor: "#050505" }}>
        <DrawerCustom />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/finance-goals" element={<FinanceGoals />} />
          <Route path="/goal-form" element={<GoalForm />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/view-article" element={<ArticlePage />} />
        </Routes>
      </Box>
    </UserContext.Provider>
  );
}

export default App;
