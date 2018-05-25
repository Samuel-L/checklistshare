import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import ChecklistItem from './ChecklistItem';

const styles = theme => ({
  textField: {
    margin: '5px',
  },
  buttonGroup: {
    [theme.breakpoints.up('lg')]: {
      position: 'fixed',
      right: '10%',
      top: '20%',
      width: '150px !important',
    },
  },
  buttonDiv: {
    width: '100%',
  },
  button: {
    width: '100%',
    margin: '1px',
    color: 'white',
    backgroundColor: theme.palette.primary.A700,
    '&:hover': {
      backgroundColor: theme.palette.primary.A700,
      color: 'white',
    },
  },
});

const CreateChecklistForm = props => (
  <form
    id="create-list-form"
    onSubmit={props.handleSubmit}
  >
    <TextField
      required
      id="title"
      label="Title"
      value={props.title}
      onChange={props.handleTitleChange}
      helperText="Please give your checklist a title"
      fullWidth
      margin="normal"
      className={props.classes.textField}
    />
    {
      props.items.map((item, idx) => (
        <ChecklistItem
          key={item.seq || item.id}
          item={item}
          idx={idx}
          handleItemTextChange={props.handleItemTextChange}
          handleItemDelete={props.handleDeleteItem}
        />
      ))
    }
    <div className={props.classes.buttonGroup}>
      <div className={props.classes.buttonDiv}>
        <Button
          id="add-item-button"
          className={props.classes.button}
          variant="flat"
          color="primary"
          onClick={props.handleAddItem}
        >
          Add Item
        </Button>
      </div>
      <div className={props.classes.buttonDiv}>
        <Button
          id="create-list-button"
          className={props.classes.button}
          variant="flat"
          color="primary"
          onClick={props.handleCreateList}
        >
          { props.editMode ? 'Update List' : 'Create List' }
        </Button>
      </div>
    </div>
  </form>
);

CreateChecklistForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleItemTextChange: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleCreateList: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  editMode: PropTypes.bool,
};

CreateChecklistForm.defaultProps = {
  editMode: false,
};

export default withStyles(styles)(CreateChecklistForm);
