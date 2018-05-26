import React from 'react';
import { Route } from 'react-router-dom';

import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import teal from 'material-ui/colors/teal';
import blueGrey from 'material-ui/colors/blueGrey';

import Header from './shared/Header';
import Footer from './shared/Footer';
import HomePage from './pages/Home';
import ChecklistPage from './pages/Checklist';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: blueGrey,
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <div className="app-container" style={{ height: '100%' }}>
      <CssBaseline />
      <Header />
      <div style={{ minHeight: '83%' }}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})" component={ChecklistPage} />
      </div>
      <Footer />
    </div>
  </MuiThemeProvider>
);

export default App;
