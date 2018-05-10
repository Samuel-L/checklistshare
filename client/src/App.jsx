import React from 'react';

import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import lightBlue from 'material-ui/colors/lightBlue';
import blueGrey from 'material-ui/colors/blueGrey';

import Header from './shared/Header';
import HomePage from './pages/Home';

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: blueGrey,
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <div className="app-container">
      <CssBaseline />
      <Header />
      <HomePage />
    </div>
  </MuiThemeProvider>
);

export default App;
