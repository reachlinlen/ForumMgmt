import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  forumContainer: {
    maxWidth: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '5vh',
  },
}));

function Forums() {
  const classes = useStyles();
  return (
    <Grid container className={classes.forumContainer}>
      <Typography variant="h4" gutterBottom>
        Trending Topics...
      </Typography>
    </Grid>
  );
}

export default Forums;
