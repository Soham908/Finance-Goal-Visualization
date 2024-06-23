import React, { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import articlesData from "./articles.json"; 
import ArticleCard from "../components/ArticleCard";

const Articles = ({ category }) => {
  const [articles, setArticles] = useState([]);
  var slice = category || articles?.length;

  useEffect(() => {
    if (category)
      setArticles(
        articlesData.savings
      );
    else setArticles(articlesData.savings);
    slice = articles?.length;
  }, []);

  return (
    <Grid container display="flex">
      {!category && (
        <Grid item paddingTop={6} paddingLeft={6} sx={{ backgroundColor: 'wheat', width: '100%' }}>
          <Typography variant="h4" color="black" fontWeight='bold' gutterBottom>
            Related Articles
          </Typography>
          <Typography variant="body1" color="black" paragraph>
            Learn more about savings, investment, vacation planning, home
            buying, and car ownership.
          </Typography>
        </Grid>
      )}
      <Box>
        <Grid container justifyContent="space-evenly">
          {
            category ? 
            <Box>
              <Grid container justifyContent='space-evenly'>
                {articlesData[category].map((article, index) => (
                  <Grid item key={index} marginTop={5} sx={{ width: { xs: '90%', sm: '45%', md: '23%' } }}>
                    <ArticleCard article={article} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            :
          Object.keys(articlesData).map((key) =>
            articlesData[key].map((article, index) => (
              <Grid
                item
                key={index}
                marginTop={5}
                sx={{ width: { xs: "90%", sm: "45%", md: "23%" } }}
              >
                <ArticleCard article={article} />
              </Grid>
              ))
            )
          }
        </Grid>
      </Box>
    </Grid>
  );
};

export default Articles;
