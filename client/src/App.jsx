import React from 'react';
import { Route } from 'react-router-dom';

import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import blueGrey from 'material-ui/colors/blueGrey';

import Header from './shared/Header';
import HomePage from './pages/Home';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: blueGrey,
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <div className="app-container">
      <CssBaseline />
      <Header />
      <Route exact path="/" component={HomePage} />
    </div>
  </MuiThemeProvider>
);

export default App;
