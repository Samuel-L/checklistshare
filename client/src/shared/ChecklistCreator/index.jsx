import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { addChecklist } from '../../redux-modules/checklist-adder';
import CreateChecklistForm from './CreateChecklistForm';
import SubmitConfirmationModal from './SubmitConfirmationModal';
import SnackError from '../SnackError';

export class ChecklistCreator extends Component {
  state = {
    id: 0,
    title: '',
    items: [{ id: 0, name: '' }],
    submitConfirmationModalOpen: false,
    snackError: false,
  };

  componentDidMount = () => {
    if (this.props.editMode) {
      const { checklist } = this.props;
      this.setState({
        id: checklist.id,
        title: checklist.title,
        items: checklist.items,
      });
    }
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

  itemsArePopulated = () => {
    const { items } = this.state;
    let populated = true;
    items.forEach((item) => {
      if (!item.name) {
        populated = false;
      }
    });

    return populated;
  };

  handleSubmitConfirmationModal = () => {
    let snackError = false;
    let openModal = true;

    if (!this.state.title) {
      snackError = true;
      openModal = false;
    }
    if (!this.itemsArePopulated()) {
      snackError = true;
      openModal = false;
    }
    if (this.state.submitConfirmationModalOpen) {
      openModal = false;
    }

    this.setState({ submitConfirmationModalOpen: openModal, snackError });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, items } = this.state;
    if (this.props.editMode) {
      // editChecklist()
    } else {
      this.props.addChecklist(title, items);
    }
  };

  handleSnackErrorToggle = () => {
    this.setState({ snackError: !this.state.snackError });
  };

  render() {
    const { submitConfirmationModalOpen } = this.state;
    return (
      <React.Fragment>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="display1" align="center">
              { this.props.editMode ? 'Edit checklist' : 'Create checklist' }
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
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
        <SnackError open={this.state.snackError} handleClose={this.handleSnackErrorToggle}>
          All fields needs to be filled!
        </SnackError>
      </React.Fragment>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  addChecklist: (title, items) => dispatch(addChecklist(title, items)),
  // editChecklist
});

ChecklistCreator.propTypes = {
  editMode: PropTypes.bool,
  addChecklist: PropTypes.func.isRequired,
  checklist: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      List: PropTypes.number,
      name: PropTypes.string,
    })),
  }),
};

ChecklistCreator.defaultProps = {
  editMode: false,
  checklist: {
    id: 0,
    title: '',
    url: '',
    items: [
      { id: 0, List: 0, name: '' },
    ],
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistCreator);
