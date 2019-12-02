import React, { useState } from 'react';
import {
  AppBar, Tabs, Tab, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import { DEFAULT_PAGE, PAGE_INDEX } from '../constants';

const useStyles = makeStyles((theme) => ({
  forumContainer: {
    maxWidth: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

function ForumAppBar(props) {
  const { history } = props;
  const classes = useStyles();
  const currentPage = PAGE_INDEX[DEFAULT_PAGE];
  return (
    <Grid container className={classes.forumContainer}>
      <AppBar position="static">
        <Tabs value={currentPage} onChange={(e, newVal) => history.push(newVal)}>
          <Tab label="Forums" />
          <Tab label="Science" />
          <Tab label="Technology" />
          <Tab label="Sports" />
        </Tabs>
      </AppBar>
    </Grid>
  );
}

ForumAppBar.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(ForumAppBar);
