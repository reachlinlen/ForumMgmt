import React from 'react';
import {
  Grid, Button, Typography, Hidden, TextField, Icon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import google from '../../assets/images/Google_Plus_icon.svg';
import Color from '../../Color';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    maxWidth: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: theme.spacing(8),
    padding: theme.spacing(6),
  },
  logo: {
    [theme.breakpoints.up('lg')]: {
      borderRight: `${theme.spacing(1)}px solid ${Color.border}`,
    },
  },
  login: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  or: {
    paddingTop: theme.spacing(5),
  },
  orText: {
    borderRadius: '50%',
    maxWidth: '47%',
    marginLeft: 'auto',
    marginRight: 'auto',
    background: Color.border,
    textAlign: 'center',
  },
  loginContainer: {
    paddingLeft: theme.spacing(3),
  },
  hostLogin: {
    paddingLeft: theme.spacing(4),
    '& .MuiFormControl-root.MuiTextField-root': {
      width: '100%',
    },
    '& .MuiButton-containedSecondary': {
      width: '100%',
    },
  },
}));

function Home() {
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    grecaptcha.ready(function() {
      grecaptcha.execute('6LemdMUUAAAAAL6YanSVVocTS4bAotgl_IuqLGwr', {action: 'homepage'}).then(function(token) {
         console.log('token:',token);
      });
    });
  };
  const handleUserNameChange = (e) => null;
  const handlePasswordChange = (e) => null;

  return (
    <>
      <Grid container spacing={2} className={classes.pageContainer}>
        <Grid item xs={12} lg={3} className={classes.logo}>
          <img src="src/assets/images/O.png" alt="OOLogo" />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Grid container className={classes.loginContainer}>
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.login}>
                Login
              </Typography>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Button variant="contained" color="primary" href="www.google.com" startIcon={<Icon><img src={google} alt="googleLogo" /></Icon>}>
                Sign up with Google
              </Button>
            </Grid>
            <Hidden mdDown>
              <Grid item lg={1} className={classes.or}>
                <Typography variant="body1" className={classes.orText}>
                  Or
                </Typography>
              </Grid>
            </Hidden>
            <Grid item xs={12} lg={5}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={5} className={classes.hostLogin}>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder="Username"
                      helperText=""
                      onChange={handleUserNameChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      placeholder="Password"
                      onChange={handlePasswordChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <div
                      className="g-recaptcha"
                      data-sitekey="6LemdMUUAAAAAL6YanSVVocTS4bAotgl_IuqLGwr"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <input type="submit" value="Login" />
                    {/* <Button variant="contained" fullWidth>Login</Button> */}
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
