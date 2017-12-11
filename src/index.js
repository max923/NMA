import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'
// Containers
import Full from './containers/Full/'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
    <Full />
  </MuiThemeProvider>
);

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route path="/" name="Home" component={App}/>
    </Switch>
  </HashRouter>
), document.getElementById('root'));
