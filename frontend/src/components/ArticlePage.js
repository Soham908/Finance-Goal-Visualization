import React from 'react';
import { Box, Typography, Paper, Divider, Chip } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ArticlePage = () => {

  const location = useLocation()
  const article = location.state
  console.log(article);
  return (
    <Paper elevation={3} sx={{ padding: 4, margin: 2, height: "200vh", }}>
      <Typography variant="h3" component="h1" gutterBottom>
        {article.title}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" color="textSecondary">
          By {article.author}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {new Date(article.date).toLocaleDateString()}
        </Typography>
      </Box>
      <Box mb={2}>
        {article.tags.map((tag, index) => (
          <Chip key={index} label={tag} sx={{ marginRight: 1 }} />
        ))}
      </Box>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="h4" component="h2" gutterBottom>
        {article.content.mainHeading}
      </Typography>
      <Typography variant="body1" paragraph>
        {article.content.mainContent}
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        {article.content.subHeaders[0].subHeaderFirst}
      </Typography>
      <Typography variant="body1" paragraph>
        {article.content.subHeaders[0].subContentFirst}
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        {article.content.subHeaders[1].subHeaderSecond}
      </Typography>
      <Typography variant="body1" paragraph>
        {article.content.subHeaders[1].subContentSecond}
      </Typography>
    </Paper>
  );
};


export default ArticlePage
