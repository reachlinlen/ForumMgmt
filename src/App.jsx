import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Login from './pages/Login';
import Forums from './pages/Forums';
import Science from './pages/Science';
import Technology from './pages/Technology';
import Sports from './pages/Sports';
import ForumAppBar from './components/ForumAppBar';

function App(props) {
  const { location, auth } = props;
  const isLogin = location.pathname === '/';
  const isAuthenticated = auth;
  return (
    <>
      { !isLogin && isAuthenticated && <ForumAppBar />}
      {
        !isLogin && !isAuthenticated && (
          <Switch>
            <Route component={Login} />
          </Switch>
        )
      }
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/forums" exact component={Forums} />
        <Route path="/science" exact component={Science} />
        <Route path="/technology" exact component={Technology} />
        <Route path="/sports" exact component={Sports} />
      </Switch>
    </>
  );
}

App.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// export default withRouter(App);

export default connect(
  mapStateToProps,
)((withRouter)(App));
