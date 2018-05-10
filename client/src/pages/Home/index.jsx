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

  handleDeleteItem = (idx) => {
    this.setState({
      items: this.state.items.filter((item, iidx) => idx !== iidx),
    }, () => {
      // Ensure that the id field is unique
      const newItems = this.state.items.map((item, iidx) => ({
        ...item, id: iidx,
      }));

      this.setState({ items: newItems });
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
            handleDeleteItem={this.handleDeleteItem}
            title="Checklist title"
            items={this.state.items}
          />
        </Grid>
      </Grid>
    );
  }
}

export default Home;
