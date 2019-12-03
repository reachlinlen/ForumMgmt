/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Formik, Form, useField } from 'formik';
import {
  Grid, TextField, makeStyles, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { get } from 'lodash';

import { LOGIN_FORM_INIT_VALUE, HELPER_TEXT } from '../constants';
import { authenticate, addNewUser } from '../api';

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

const LoginTextField = ({ ...props }) => {
  const { name, infoText } = props;
  const [field, meta] = useField(props);
  return (
    <TextField
      label={name}
      {...field}
      {...props}
      helperText={infoText}
      error={meta.error && meta.touched}
    />
  );
};

LoginTextField.propTypes = {
  name: PropTypes.string.isRequired,
  infoText: PropTypes.string.isRequired,
};

function ManualLogin() {
  const classes = useStyles();
  const handleSubmit = (username, password) => {
    let recToken = '';
    grecaptcha.ready(() => {
      grecaptcha.execute('6LemdMUUAAAAAL6YanSVVocTS4bAotgl_IuqLGwr', { action: 'homepage' })
        .then((token) => {
          recToken = token;
        });
    });
    async function checkLogin() {
      const authenticated = await authenticate(username, password, recToken);
      if (!get(authenticated, 'error', false)) {
        //TODO
      }
    }
    checkLogin();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    async function newUser() {
      const resp = await addNewUser(e.currentTarget.form[0].value, e.currentTarget.form[1].value);
      e.stopPropagation();
      if (!get(resp, 'data.error', false)) {
        //TODO
      }
    }
    newUser();
  };

  return (
    <Formik
      initialValues={LOGIN_FORM_INIT_VALUE}
      validationSchema={
        Yup.object({
          username: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(8)
            .max(25)
            .matches(/[a-zA-Z0-9*$#._]/)
            .required('Required'),
        })
      }
      onSubmit={(e) => {
        handleSubmit(e.username, e.password);
      }}
    >
      <Form>
        <Grid container spacing={2} className={classes.hostLogin}>
          <Grid item xs={12} className={classes.loginText}>
            <LoginTextField
              id="username"
              name="username"
              infoText={USERNAME}
            />
          </Grid>
          <Grid item xs={12} className={classes.loginText}>
            <LoginTextField
              type="password"
              id="password"
              name="password"
              infoText={PASSWORD}
            />
          </Grid>
          <Grid item xs={12}>
            <div
              className="g-recaptcha"
              data-sitekey="6LemdMUUAAAAAL6YanSVVocTS4bAotgl_IuqLGwr"
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" fullWidth color="primary">Login</Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" fullWidth color="primary" onClick={handleRegister}>Register</Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

ManualLogin.propTypes = {
};

export default ManualLogin;
