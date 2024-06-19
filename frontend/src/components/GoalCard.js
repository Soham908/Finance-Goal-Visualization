import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Grid,
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
  CardMedia,
} from "@mui/material";
import { CheckCircle, Pending, ErrorOutline, MoreVert, Edit, Delete } from "@mui/icons-material";

const GoalCard = ({ goal, onEdit, onDelete }) => {
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

  const handleDeleteClick = () => {
    setOpen(true);
    handleCloseMenu();
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const progress = (currentAmount / targetAmount) * 100;

  return (
    <Card sx={{ height: '100%', width: '100%', display: "flex", flexDirection: "column", justifyContent: "space-evenly", marginBottom: 2, borderRadius: 8, padding: 1 }}>
      <CardHeader
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={() => onEdit(goal)}>
                <Edit sx={{ marginRight: 1 }} /> Edit
              </MenuItem>
              <MenuItem onClick={handleDeleteClick}>
                <Delete sx={{ marginRight: 1 }} /> Delete
              </MenuItem>
            </Menu>
          </>
        }
        title={
          <Box display="flex" alignItems="center">
            <Typography variant="h5" sx={{ fontWeight: "bold", marginRight: 2 }}>
              {goalName}
            </Typography>
            <Tooltip
              title={
                bankVerification === "verified"
                  ? "Bank Verified"
                  : bankVerification === "pending"
                  ? "Verification Pending"
                  : "Bank Verification Needed"
              }
            >
              <Box>{getVerificationIcon()}</Box>
            </Tooltip>
          </Box>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {goalDescription}
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary" align="center">
            {progress.toFixed(2)}% funded
          </Typography>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
          {goalTags?.map((tag) => (
            <Chip key={tag} label={tag} color="primary" variant="outlined" clickable />
          ))}
          <Chip key={goalPriority} label={goalPriority} color="secondary" variant="outlined" clickable />
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
    </Card>
  );
};

export default GoalCard;
