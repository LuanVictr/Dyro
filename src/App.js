import React from 'react'; // e la vamos nos
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Search from './Pages/Search';
import Album from './Pages/Album';
import Favorites from './Pages/Favorites';
import Profile from './Pages/Profile';
import ProfileEdit from './Pages/ProfileEdit';
import NotFound from './Pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route
          path="/profile/edit"
          component={ ProfileEdit }
        />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
