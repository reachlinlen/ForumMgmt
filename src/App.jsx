import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Login from './pages/Login';
import Forums from './pages/Forums';
import Science from './pages/Science';
import Technology from './pages/Technology';
import Sports from './pages/Sports';
import ForumAppBar from './components/ForumAppBar';

function App(props) {
  const { auth } = props;
  const isAuthenticated = auth;
  return (
    <>
      { isAuthenticated && <ForumAppBar />}
      {
        !isAuthenticated && (
          <Switch>
            <Route component={Login} />
          </Switch>
        )
      }
      {
        isAuthenticated
        && (
          <Switch>
            <Route path="/" exact component={Forums} />
            <Route path="/forums" exact component={Forums} />
            <Route path="/science" exact component={Science} />
            <Route path="/technology" exact component={Technology} />
            <Route path="/sports" exact component={Sports} />
          </Switch>
        )
      }
    </>
  );
}

App.propTypes = {
  auth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// export default withRouter(App);

export default connect(
  mapStateToProps,
)((App));
