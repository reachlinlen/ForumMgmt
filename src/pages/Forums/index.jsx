import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ForumLayout from '../../components/ForumLayout';

const useStyles = makeStyles((theme) => ({
  forumContainer: {
    maxWidth: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

function Forums() {
  const classes = useStyles();
  const value = 'Science';
  return (
    <Grid container className={classes.forumContainer}>
      { value === 'Science' && <ForumLayout /> }
    </Grid>
  );
}

export default Forums;
