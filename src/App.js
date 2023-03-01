import React from 'react'; // e la vamos nos
import { Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Search from './Pages/Search';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/search" component={ Search } />
    </Switch>
  );
}

export default App;
