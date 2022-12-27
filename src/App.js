import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import './index.css'
import './App.css'



class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/trybe-tunes" component={ Login } />
          <Route exact path="/trybe-tunes/search" component={ Search } />
          <Route exact path="/trybe-tunes/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route exact path="/trybe-tunes/favorites" component={ Favorites } />
          <Route exact path="/trybe-tunes/profile" component={ Profile } />
          <Route exact path="/trybe-tunes/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />

        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
