import React from 'react';
import { Formik } from 'formik';
import { Grid, TextField, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

import { HELPER_TEXT } from '../constants';

const INIT_VALUE = {
  userName: '',
  password: '',
};

const { USERNAME, PASSWORD } = HELPER_TEXT;

const useStyles = makeStyles((theme) => ({
  hostLogin: {
    paddingLeft: theme.spacing(4),
    [theme.breakpoints.up('lg')]: {
      '& .MuiFormControl-root.MuiTextField-root': {
        width: '100%',
      },
      '& .MuiButton-containedSecondary': {
        width: '100%',
      },
    },
    [theme.breakpoints.down('md')]: {
      '& .MuiFormControl-root.MuiTextField-root': {
        width: '38%',
      },
      '& .MuiButton-containedSecondary': {
        width: '30%',
      },
    },
  },
  loginText: {
    [theme.breakpoints.up('lg')]: {
      height: '12vh',
    },
    [theme.breakpoints.down('md')]: {
      width: '30%',
    },
  },
}));

function ManualLogin() {
  const classes = useStyles();
  const handleSubmit = e => {
    e.preventDefault();
    grecaptcha.ready(function() {
      grecaptcha.execute('6LemdMUUAAAAAL6YanSVVocTS4bAotgl_IuqLGwr', {action: 'homepage'}).then(function(token) {
         console.log('token:',token);
      });
    });
  };

  return (
    <Formik
      initialValues={INIT_VALUE}
    >
      {
        (props) => {
          const { values, handleChange } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} className={classes.hostLogin}>
                <Grid item xs={12} className={classes.loginText}>
                  <TextField
                    type="text"
                    placeholder="Username"
                    value={values.userName}
                    helperText={USERNAME}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} className={classes.loginText}>
                  <TextField
                    placeholder="Password"
                    onChange={handleChange}
                    helperText={PASSWORD}
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
          );
        }
      }
    </Formik>
  );
}

ManualLogin.propTypes = {
  values: PropTypes.instanceOf(Object).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ManualLogin;
