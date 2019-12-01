import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Forums from './pages/Forums';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/forums" exact component={Forums} />
    </Switch>
  );
}

export default App;
