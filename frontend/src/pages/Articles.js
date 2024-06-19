import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import articlesData from './articles.json'; // Importing JSON data
import ArticleCard from '../components/ArticleCard';

const Articles = ({ sliceNum }) => {
  const [articles, setArticles] = useState([]);
  var slice = sliceNum || articles?.length

  useEffect(() => {
    if(sliceNum)
      setArticles(articlesData.savings); // Assuming your JSON structure is { "articles": [...] }
    else
      setArticles(articlesData)
    slice = articles?.length
  }, []);

  return (
    <Grid container display="flex" direction="column">
      {console.log(articles)}
      {
        !sliceNum &&
      <>
      <Typography variant="h4" gutterBottom>Related Articles</Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Learn more about savings, investment, vacation planning, home buying, and car ownership.
      </Typography>
      </>
      }
      <Box>
        <Grid container justifyContent='space-evenly'>
          {articles?.slice(0, slice).map((article, index) => (
            <Grid item key={index} marginTop={10} sx={{ width: { xs: '90%', sm: '45%', md: '23%' } }}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default Articles;
