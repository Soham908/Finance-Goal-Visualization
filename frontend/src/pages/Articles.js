import { Grid, Typography, Box } from "@mui/material";
import articlesData from "../data/articles.json"; 
import ArticleCard from "../components/ArticleCard";
import { useUserGoalStore } from "../store/store";

const Articles = ({ category }) => {

  const goalDataStore = useUserGoalStore(state => state.goalData)
  var cat = category;
  if ( goalDataStore && goalDataStore[0]?.goalTags){
    cat = goalDataStore[0]?.goalTags[0]
  }
  console.log(cat);
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
                {articlesData[cat].map((article, index) => (
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
