/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Formik, Form, useField } from 'formik';
import {
  Grid, TextField, makeStyles, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { get } from 'lodash';
import { connect } from 'react-redux';

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
  const { name, helperText } = props;
  const [field, meta] = useField(props);
  return (
    <TextField
      label={name}
      {...field}
      {...props}
      helperText={helperText}
      error={meta.error && meta.touched}
    />
  );
};

LoginTextField.propTypes = {
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
};

function ManualLogin(props) {
  const { updateAuthenticate } = props;
  const classes = useStyles();
  const handleSubmit = (username, password) => {
    //TODO Rectify the issue
    // grecaptcha.ready(() => {
    //   grecaptcha.execute('6Lfm58UUAAAAAEY0uzJO5C1cJBSYlc65deow8fUN', { action: 'login' })
    //     .then((token) => token);
    // });
    async function checkLogin() {
      const authenticated = await authenticate(username, password);
      if (!get(authenticated, 'data.error', false) && get(authenticated, 'data', false)) {
        updateAuthenticate(true);
      } else {

      }
    }
    checkLogin();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    async function newUser() {
      const resp = await addNewUser(e.currentTarget.form[0].value, e.currentTarget.form[1].value);
      e.stopPropagation();
      if (!get(resp, 'data.error', false) && get(resp, 'data.inserted', false)) {
        updateAuthenticate(true);
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
            .matches(/[a-z]/)
            .matches(/[A-Z]/)
            .matches(/[0-9]/)
            .matches(/[@$#_]/)
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
              helperText={USERNAME}
            />
          </Grid>
          <Grid item xs={12} className={classes.loginText}>
            <LoginTextField
              type="password"
              id="password"
              name="password"
              helperText={PASSWORD}
            />
          </Grid>
          <Grid item xs={12}>
            <div
              className="g-recaptcha"
              data-sitekey="6Lfm58UUAAAAAEY0uzJO5C1cJBSYlc65deow8fUN"
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
  updateAuthenticate: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAuthenticate: (data) => dispatch({ type: 'AUTHENTICATION', payload: data }),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(ManualLogin);
