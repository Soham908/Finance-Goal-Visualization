import React from 'react';
import { Card, CardHeader, CardContent, Box, Typography, Skeleton, IconButton, LinearProgress } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const GoalCardSkeleton = () => {
  return (
    <Card elevation={5}
      sx={{
        height: '100%', width: '100%', display: "flex", flexDirection: "column", justifyContent: "space-evenly",
        marginBottom: 2, borderRadius: 8, padding: 1,
        border: "1px solid #ddd",
        backgroundColor: "#050505",
        borderColor: "#ffaaff",
      }}
    >
      <CardHeader
        action={
          <Box display='flex' alignItems='center'>
            <Skeleton variant="circular" width={40} height={40} />
            <IconButton aria-label="settings">
              <MoreVertIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
        }
        title={
          <Skeleton variant="text" width="60%" height={28} sx={{ bgcolor: 'grey.700' }} />
        }
      />
      <CardContent>
        <Typography variant="body2" color="white" gutterBottom>
          <Skeleton variant="text" width="80%" sx={{ bgcolor: 'grey.700' }} />
          <Skeleton variant="text" width="60%" sx={{ bgcolor: 'grey.700' }} />
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Skeleton variant="rectangular" height={10} sx={{ bgcolor: 'grey.700' }} />
          <Typography variant="body2" color="white" align="center">
            <Skeleton variant="text" width="30%" sx={{ bgcolor: 'grey.700' }} />
          </Typography>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
          <Skeleton variant="rectangular" width={60} height={30} sx={{ bgcolor: 'grey.700' }} />
          <Skeleton variant="rectangular" width={60} height={30} sx={{ bgcolor: 'grey.700' }} />
          <Skeleton variant="rectangular" width={60} height={30} sx={{ bgcolor: 'grey.700' }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default GoalCardSkeleton;
