import React from 'react'; // e la vamos nos
import { Route, Switch } from 'react-router-dom';
import Album from './Pages/Album';
import Home from './Pages/Home';
import Search from './Pages/Search';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/search" component={ Search } />
      <Route path="/album/:id" component={ Album } />
    </Switch>
  );
}

export default App;
