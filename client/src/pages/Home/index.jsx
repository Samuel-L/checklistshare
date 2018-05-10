import React, { Component } from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import CreateChecklistForm from './CreateChecklistForm';

export class Home extends Component {
  state = {};

  render() {
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="display1" align="center">
            Create checklist
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <CreateChecklistForm
            handleSubmit={() => {}}
            handleTextFieldChange={() => {}}
            title="Checklist title"
          />
        </Grid>
      </Grid>
    );
  }
}

export default Home;
