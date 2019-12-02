import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Color from '../Color';
import { getTopicContent } from '../api';
import TopicDiscussion from './TopicDiscussion';

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
  const { topics, subject } = props;
  const classes = useStyles();
  const [selTopic, setSelTopic] = useState(get(topics[0], 'topic_id', ''));
  const [topicContent, setTopicContent] = useState('');

  const showTopicContent = (topicId) => {
    setSelTopic(topicId);
  };

  useEffect(() => {
    async function fetchTopicContent() {
      const resp = await getTopicContent(subject, selTopic);
      if (resp) {
        setTopicContent(resp);
      }
    }
    fetchTopicContent();
  }, [topics, selTopic]);

  return (
    <Grid container className={classes.forumContainer}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>Topics</Typography>
      </Grid>
      <Grid item xs={12} lg={3} className={classes.list}>
        <ul className={classes.topics}>
          {
            topics.map((item, ind) => (
              <ul
                className={classes.topics}
                key={item.topic_id}
                onClick={e => showTopicContent(item.topic_id)}
              >
                <Typography variation="caption" display="block" gutterBottom>
                  {ind + 1}. {item.topic}
                </Typography>
              </ul>
            ))
          }
        </ul>
      </Grid>
      <Grid item xs={12} lg={9}>
        <ul className={classes.topics}>
          {
            topicContent
            && topicContent.map((item) => (
              <ul key={item.topic_id}>
                <Typography variation="caption" display="block" gutterBottom>
                  <TopicDiscussion content={item.topic_content} title={item.topic} comments={item.comments} />
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
  subject: PropTypes.string.isRequired,
};

export default ForumLayout;
