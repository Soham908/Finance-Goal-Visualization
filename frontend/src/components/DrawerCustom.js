import { Drawer, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import SavingsIcon from '@mui/icons-material/Savings';
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DrawerCustom = () => {
    const drawerWidth = '15%';
    const navigate = useNavigate()
  return (
    <Drawer
    sx={{
      width: "17%",
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: {
        width: "17%",
        boxSizing: "border-box",
        backgroundColor: "#f4f4f4",
        padding: "0.5%",
        color: "white",
        backgroundColor: "#0B0D0E",
      },
    }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <IconButton onClick={() => {navigate("/profile")} }>
            <AccountCircleIcon sx={{ width: 33, height: 33, color: 'wheat' }}/>
          </IconButton>
          <Typography sx={{ marginLeft: 1, fontSize: 22 }}>
            Soham 
          </Typography>
        </Toolbar>
        <Divider sx={{ backgroundColor: 'wheat' }} />
        <List>
          {
          [
            { text: "HomePage", icon: <HomeIcon />, onClick: () => {navigate("/")} },
            { text: "Finance Goals", icon: <SavingsIcon />, onClick: () => {navigate("/finance-goals")}},
            { text: "Articles", icon: <ArticleIcon />, onClick: () => {navigate("/articles")}},
            { text: "Login", icon: <LoginIcon />, onClick: () => {navigate("/login")}},
          ]
          .map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
              sx={{
                padding: "8px 16px",
                "&:hover": { backgroundColor: "black" },
                "&.Mui-selected": {
                  backgroundColor: "#d0d0d0",
                  "&:hover": { backgroundColor: "#c0c0c0" },
                },
                borderRadius: 4,
                marginTop: "5%",
              }}
                onClick={item.onClick}
              >
                <ListItemIcon sx={{ minWidth: 36, color: "white" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
  )
}

export default DrawerCustom