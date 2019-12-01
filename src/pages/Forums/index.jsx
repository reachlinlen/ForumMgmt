import React, { useState } from 'react';
import {
  AppBar, Tabs, Tab, Grid,
} from '@material-ui/core';
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
  const [value, setValue] = useState('Science');
  return (
    <Grid container className={classes.forumContainer}>
      <AppBar position="static">
        <Tabs value={value} onChange={(e, newVal) => setValue(newVal)}>
          <Tab label="Science" />
          <Tab label="Technology" />
          <Tab label="Sports" />
        </Tabs>
      </AppBar>
      { value === 'Science' && <ForumLayout /> }
    </Grid>
  );
}

export default Forums;
