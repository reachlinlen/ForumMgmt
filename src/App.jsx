import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from './pages/Login';
import Forums from './pages/Forums';
import Science from './pages/Science';
import Technology from './pages/Technology';
import Sports from './pages/Sports';
import ForumAppBar from './components/ForumAppBar';

function App(props) {
  const { location } = props;
  const isLogin = location.pathname === '/';
  return (
    <>
      { !isLogin && <ForumAppBar />}
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/forums" exact component={Forums} />
        <Route path="/science" exact component={Science} />
        <Route path="/Technology" exact component={Technology} />
        <Route path="/Sports" exact component={Sports} />
      </Switch>
    </>
  );
}

App.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(App);
