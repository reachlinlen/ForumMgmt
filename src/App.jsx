import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Forums from './pages/Forums';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/forums" exact component={Forums} />
    </Switch>
  );
}

export default App;
