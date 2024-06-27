import { Box } from "@mui/material";
import DrawerCustom from "./components/DrawerCustom";
import GoalForm from "./components/GoalForm";
import { Route, Routes } from "react-router-dom";
import FinanceGoals from "./pages/FinanceGoals";
import Homepage from "./pages/Homepage";
import Articles from "./pages/Articles";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ArticlePage from "./components/ArticlePage";
import { useUserDataStore } from "./store/store";


function App() {
  const username = localStorage.getItem("userCredentialGoal");
  const setStoreUserData = useUserDataStore(state => state.setStoreUserData)
  setStoreUserData({ username })

  return (
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
  );
}

export default App;
