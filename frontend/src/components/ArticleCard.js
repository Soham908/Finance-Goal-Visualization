import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  CardActionArea,
} from '@mui/material';
import { useNavigate } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const { title, tags, author, date, content } = article;
  const navigate = useNavigate()

  // Summarize content to show a preview in the card
  const contentPreview = content.mainContent.slice(0, 105) + "...";

  return (
    <Card
      onClick={() => navigate("/view-article", { state: article }) }
      sx={{
        height: '100%',
        width: '100%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        padding: 2,
        border: "1px solid #ddd",
        backgroundColor: "#050505",
        borderColor: "#ff6460",
        color: 'white',
        boxShadow: 3,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          boxShadow: 6,
          borderColor: 'white',
          border: 1
        }
      }}
    >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="grey.300" gutterBottom marginTop={3}>
            By {author} on {new Date(date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="grey.400" paragraph marginTop={3}>
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
