import React, { Component } from 'react';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import CreateChecklistForm from './CreateChecklistForm';

export class Home extends Component {
  state = {
    items: [{ id: 0, name: '' }],
  };

  handleAddItem = () => {
    const { items } = this.state;
    this.setState({
      items: this.state.items.concat([{ id: items.length, name: '' }]),
    });
  };

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
            handleAddItem={this.handleAddItem}
            title="Checklist title"
            items={this.state.items}
          />
        </Grid>
      </Grid>
    );
  }
}

export default Home;
