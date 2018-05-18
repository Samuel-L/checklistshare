import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { addChecklist } from '../../../redux-modules/checklist-adder';
import CreateChecklistForm from './CreateChecklistForm';
import SubmitConfirmationModal from './SubmitConfirmationModal';

export class ChecklistCreator extends Component {
  state = {
    title: '',
    items: [{ id: 0, name: '' }],
    submitConfirmationModalOpen: false,
  };

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleItemTextChange = idx => (event) => {
    const newItems = this.state.items.map((item, iidx) => {
      if (idx !== iidx) {
        return item;
      }
      return { ...item, name: event.target.value };
    });

    this.setState({ items: newItems });
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

  handleSubmitConfirmationModal = () => {
    this.setState({ submitConfirmationModalOpen: !this.state.submitConfirmationModalOpen });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, items } = this.state;
    this.props.addChecklist(title, items);
  };

  render() {
    const { submitConfirmationModalOpen } = this.state;
    return (
      <React.Fragment>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="display1" align="center">
              Create checklist
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <CreateChecklistForm
              handleSubmit={() => {}}
              handleTitleChange={this.handleTitleChange}
              handleItemTextChange={this.handleItemTextChange}
              handleAddItem={this.handleAddItem}
              handleDeleteItem={this.handleDeleteItem}
              handleCreateList={this.handleSubmitConfirmationModal}
              title={this.state.title}
              items={this.state.items}
            />
          </Grid>
        </Grid>
        <SubmitConfirmationModal
          open={submitConfirmationModalOpen}
          handleClose={this.handleSubmitConfirmationModal}
          handleModalConfirm={this.handleFormSubmit}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  adding: state.checklistAdderReducer.adding,
  added: state.checklistAdderReducer.added,
  error: state.checklistAdderReducer.error,
  url: state.checklistAdderReducer.url,
});

const mapDispatchToProps = dispatch => ({
  addChecklist: (title, items) => dispatch(addChecklist(title, items)),
});

ChecklistCreator.propTypes = {
  addChecklist: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistCreator);
