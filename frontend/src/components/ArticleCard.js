import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Grid,
  CardMedia,
  Tooltip,
  IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ArticleCard = ({ article, onEdit, onDelete }) => {
  const { title, tags, author, date, content, image } = article;

  // Summarize content to show a preview in the card
  const contentPreview = content.slice(0, 105) + "...";

  return (
    <Card sx={{ height: '100%', width: '100%', display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: 8, padding: 0.5 }}>
      {/* <CardMedia
        component="img"
        height="140"
        image={image || 'https://via.placeholder.com/300x140?text=Image+Unavailable'}
        alt={title}
      /> */}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="grey" gutterBottom marginTop={3}>
          By {author} on {new Date(date).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph marginTop={3}>
          {contentPreview}
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mt={1.5}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} color="primary" variant="outlined" clickable />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
