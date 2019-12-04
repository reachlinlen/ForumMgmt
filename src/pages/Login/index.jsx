import React, { useState } from 'react';
import {
  Grid, Button, Typography, Hidden, Icon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import google from '../../assets/images/Google_Plus_icon.svg';
import Color from '../../Color';
import ManualLogin from '../../components/ManualLogin';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    maxWidth: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: theme.spacing(8),
    padding: theme.spacing(6),
  },
  loginContainer: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '2vw',
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(3),
    },
  },
  logo: {
    [theme.breakpoints.up('lg')]: {
      height: '30%',
    },
    [theme.breakpoints.down('md')]: {
      border: `${theme.spacing(1)}px solid ${Color.border}`,
    },
  },
  login: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  error: {
    height: '10vh',
    paddingLeft: '2vw',
  },
  socialMediaLogin: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(3),
    },
  },
  or: {
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(5),
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(5, 0),
      paddingLeft: '25%',
    },
  },
  orText: {
    [theme.breakpoints.up('lg')]: {
      borderRadius: '50%',
      maxWidth: '47%',
      marginLeft: 'auto',
      marginRight: 'auto',
      background: Color.border,
      textAlign: 'center',
    },
  },
}));

function Home() {
  const classes = useStyles();
  const [loginError, setLoginError] = useState('');

  const handleLoginError = (error) => {
    if (loginError !== error) {
      setLoginError(error);
    }
  };

  return (
    <>
      <Grid container className={classes.pageContainer}>
        <Grid item xs={5} lg={12} className={classes.logo}>
          <img src="src/assets/images/O.png" alt="OOLogo" />
        </Grid>
        <Grid item xs={12} lg={9}>
          <Grid container className={classes.loginContainer}>
            <Grid item xs={12} lg={6}>
              <Typography variant="h4" className={classes.login}>
                Login
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6} className={classes.error}>
              { loginError
                && (
                  <Typography variant="overline" display="block" color="error">
                    {loginError}
                  </Typography>
                )}
            </Grid>
            <Grid item xs={12} lg={5} className={classes.socialMediaLogin}>
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
            <Hidden lgUp>
              <Grid item xs={1} className={classes.or}>
                <Typography variant="body1" className={classes.orText}>
                  Or
                </Typography>
              </Grid>
            </Hidden>
            <Grid item xs={12} lg={6}>
              <ManualLogin handleLoginError={handleLoginError} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
