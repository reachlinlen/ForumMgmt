import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, Divider, makeStyles, ThemeProvider, TextField, useTheme, Button, Fab,
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { get } from 'lodash';

import CommentIcon from '@material-ui/icons/Comment';
import { storeNewComment } from '../api';

const useStyles = makeStyles((theme) => ({
  discussion: {
    [theme.breakpoints.down('md')]: {
      paddingTop: '2vh',
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '2vw',
    },
  },
  divider: {
    maxWidth: '60%',
    padding: theme.spacing(2, 0),
  },
  icons: {
    margin: theme.spacing(2, 2),
  },
  commentText: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& .MuiFormControl-root.MuiTextField-root': {
      width: '75%',
    },
  },
}));

function TopicDiscussion(props) {
  const {
    title, content, comments, topicId, subject, updateComments, totalComments,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [addComment, setAddComment] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleComment = () => setAddComment(true);
  const handleSubmit = () => {
    async function storeComment() {
      const resp = await storeNewComment(topicId, subject, [...comments, { name: 'lenin', msg: newComment }]);
      if (!get(resp, 'data.error', false) && get(resp, 'data.updated', false)) {
        setAddComment(false);
        updateComments(totalComments + 1);
      }
    }
    storeComment();
  };

  return (
    <>
      <Grid container className={classes.discussion}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            {content}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.divider}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Fab color="primary" className={classes.icons}>
            <ThumbUpIcon />
          </Fab>
          <Fab color="primary" className={classes.icons}>
            <ThumbDownIcon />
          </Fab>
        </Grid>
        <Grid item xs={12} className={classes.commentText}>
          <Typography variant="h6" gutterBottom color="textSecondary">
            Comments:
          </Typography>
        </Grid>
        {
          comments.map((comment) => (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {comment.name}
                  :
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" gutterBottom>
                  {comment.msg}
                </Typography>
              </Grid>
            </>
          ))
        }
        <Grid item xs={12} className={classes.commentText}>
          <CommentIcon onClick={handleComment} />
        </Grid>
        {
          addComment
          && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ThemeProvider theme={theme} className={classes.root}>
                    <TextField
                      className={classes.margin}
                      label="Lenin comments...."
                      variant="outlined"
                      id="mui-theme-provider-outlined-input"
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                  </ThemeProvider>
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" onClick={() => setAddComment(false)}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </>
          )
        }
      </Grid>
    </>
  );
}

TopicDiscussion.propTypes = {
  topicId: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
  })).isRequired,
  updateComments: PropTypes.func.isRequired,
  totalComments: PropTypes.number.isRequired,
};

export default TopicDiscussion;
