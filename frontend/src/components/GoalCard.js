import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  CardHeader,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Menu,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";
import { CheckCircle, Pending, ErrorOutline, MoreVert, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { deleteGoalAction, updateGoalAction, updateGoalAddFunds } from "../actions/goalActions";
import SlideSnackbar from "./SlideSnackbar";
import { useUserDataStore, useUserGoalStore } from "../store/store";

const GoalCard = ({ goal }) => {
  const {
    goalName,
    goalDescription,
    targetAmount,
    currentAmount,
    goalTags,
    goalPriority,
    bankVerification,
  } = goal;

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  const [deleteObject, setDeleteObject] = useState(null)
  
  const username = useUserDataStore(state => state.userData.username)
  const setStoreGoalData = useUserGoalStore(state => state.setStoreGoalData)
  const goalDataStore = useUserGoalStore(state => state.goalData)

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [addFundsOpen, setAddFundsOpen] = useState(false);
  const [amount, setAmount] = useState("")

  const handleDeleteClick = () => {
    setOpen(true);
    handleCloseMenu();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddFundsClose = () => {
    setAddFundsOpen(false);
  };

  const handleAddFunds = async () => {
    // const amt = bankVerification ? 
    const data = {
      goal,
      username: username,
      bankStatus: bankVerification,
      oldGoalName: goalName,
      amountToUpdate: amount
    };
    setAddFundsOpen(false)
    setAmount("")
    
    const response = await updateGoalAddFunds(data);
    console.log(response);
    if (!response.success) {
      setSnackbarOpen(true);
      setSnackbarMessage(response.message);
      // setDisableButton(false)
      return;
    }
    console.log(typeof goalDataStore, typeof response.updatedGoal);
    setStoreGoalData(response?.updatedGoal?.goals);
    setSnackbarOpen(true)
    setSnackbarMessage("Money Added Successfully")
  }

  const handleConfirmDelete = () => {
    onDelete(goal);
    setOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const getVerificationIcon = () => {
    switch (bankVerification) {
      case "verified":
        return <CheckCircle color="success" />;
      case "pending":
        return <Pending color="warning" />;
      default:
        return <ErrorOutline color="error" />;
    }
  };

  const onEdit = (goalData) => {
    if(bankVerification !== 'pending'){
      const data = {
        goalData,
        title: "Update your goal status"
      }
      navigate("/goal-form", {state: data})
    } else if (bankVerification === 'verified') {
      setSnackbarOpen(true); 
      setSnackbarMessage("Bank Status pending, cannot edit right now");
    } else {
      setSnackbarOpen(true); 
      setSnackbarMessage("Bank Status pending, cannot edit right now");
    }
  }

  const onDelete = async () => {
    if(bankVerification === 'pending'){
      setSnackbarOpen(true); 
      setSnackbarMessage("Bank Status pending, cannot delete right now");
      return 
    }
    const data = {
      username: username,
      goalName: deleteObject.goalName,
      bankVerification: deleteObject.bankVerification,
      goalAmount: currentAmount
    }
    const response = await deleteGoalAction(data)
    setStoreGoalData(response.afterDeleteGoal)
  }

  const progress = (currentAmount / targetAmount) * 100;

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card elevation={5} 
      sx={{ height: '100%', width: '100%', display: "flex", flexDirection: "column", justifyContent: "space-evenly", 
          marginBottom: 2, borderRadius: 8, padding: 1 ,
          border: "1px solid #ddd",
          backgroundColor: "#050505",
          borderColor: "#ffaaff",
          }}>
      <CardHeader
        action={
          <Box display='flex' alignItems='center'>
          <Tooltip
              title={
                bankVerification === "verified"
                  ? "Bank Verified"
                  : bankVerification === "pending"
                  ? "Verification Pending"
                  : "Bank Verification Needed"
              }
            >
              <Box marginTop={0.6}> {getVerificationIcon()} </Box>
            </Tooltip>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVert sx={{ color: 'white' }}/>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={() => onEdit(goal)}>
                <Edit sx={{ marginRight: 1 }} /> Edit
              </MenuItem>
              <MenuItem onClick={() => {handleDeleteClick(); setDeleteObject({goalName: goal.goalName, bankVerification: goal.bankVerification })}}>
                <Delete sx={{ marginRight: 1 }} /> Delete
              </MenuItem>
            </Menu>
          </Box>
        }
        title={
          <Box display="flex" alignItems="center" justifyContent='space-between'>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginRight: 2, color: 'white' }}>
              {goalName}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Typography variant="body2" color="white" gutterBottom>
          {goalDescription}
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="white" align="center">
            {progress.toFixed(2)}% funded
          </Typography>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={1} mt={1} justifyContent='space-between'>
          <Grid>
          {goalTags?.map((tag) => (
            <Chip key={tag} label={tag} color="primary" variant="outlined" clickable sx={{ marginRight: 1  }}/>
          ))}
          <Chip key={goalPriority} label={goalPriority} color="secondary" variant="outlined" clickable />
          </Grid>
          <Grid>
          <Button variant="outlined" size="small" onClick={() => {
            if(bankVerification === 'pending'){
              setSnackbarOpen(true); 
              setSnackbarMessage("Bank Status pending, cannot delete right now");
              return 
            }
            setAddFundsOpen(true)
          }}
            >Add Funds</Button>
          </Grid>
        </Box>
      </CardContent>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the goal "{goalName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={addFundsOpen} onClose={handleAddFundsClose}>
        <DialogTitle>Add Funds</DialogTitle>
        <DialogContent>
          <Typography>
            Your Current Target Amount is : { targetAmount }
          </Typography>
          <Typography>
            How much amount to add more to the current amount : { currentAmount }
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Current Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddFundsClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddFunds} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <SlideSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
        autoHideDuration={2500}
      />
    </Card>
  );
};

export default GoalCard;
