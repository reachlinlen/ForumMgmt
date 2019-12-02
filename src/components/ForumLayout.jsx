import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Color from '../Color';

const useStyles = makeStyles((theme) => ({
  forumContainer: {
    maxWidth: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  topics: {
    paddingInlineStart: '0',
  },
  list: {
    borderRight: `${theme.spacing(1)}px solid ${Color.border}`,
    height: '90vh',
  },
}));

function ForumLayout(props) {
  const { topics } = props;
  const classes = useStyles();
  // const topicList = ['A', 'B', 'C'];
  return (
    <Grid container className={classes.forumContainer}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>Topics</Typography>
      </Grid>
      <Grid item xs={12} lg={3} className={classes.list}>
        <ul className={classes.topics}>
          {
            topics.map((item, ind) => (
              <ul className={classes.topics}>
                <Typography variation="caption" display="block" gutterBottom>
                  {ind + 1}. {item.topic}
                </Typography>
              </ul>
            ))
          }
        </ul>
      </Grid>
    </Grid>
  );
}

ForumLayout.propTypes = {
  topics: PropTypes.instanceOf(Object).isRequired,
};

export default ForumLayout;
