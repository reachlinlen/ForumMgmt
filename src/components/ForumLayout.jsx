import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Color from '../Color';

const useStyles = makeStyles((theme) => ({
  topics: {
    paddingInlineStart: '0',
  },
  list: {
    borderRight: `${theme.spacing(1)}px solid ${Color.border}`,
  },
}));

function ForumLayout(props) {
  const classes = useStyles();
  // const { topicList } = props;
  const topicList = ['A', 'B', 'C'];
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>Topics</Typography>
      </Grid>
      <Grid item xs={12} lg={3} className={classes.list}>
        <ul className={classes.topics}>
          {
            topicList.map((item, ind) => (
              <ul className={classes.topics}>
                <Typography variation="caption" display="block" gutterBottom>
                  {ind + 1}. {item}
                </Typography>
              </ul>
            ))
          }
        </ul>
      </Grid>
    </Grid>
  );
}

export default ForumLayout;
