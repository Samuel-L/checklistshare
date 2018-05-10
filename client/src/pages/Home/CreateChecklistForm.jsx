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
    [theme.breakpoints.up('md')]: {
      width: '150px',
      float: 'right',
    },
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      bottom: '0',
      width: '100%',
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
      id="name"
      label="Title"
      value={props.title}
      onChange={props.handleTextFieldChange}
      helperText="Please give your checklist a title"
      fullWidth
      margin="normal"
      className={props.classes.textField}
    />
    {
      props.items.map((item, idx) => (
        <ChecklistItem
          key={item.id}
          item={item}
          idx={idx}
          handleItemTextChange={() => {}}
          handleItemDelete={() => {}}
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
          className={props.classes.button}
          variant="flat"
          color="primary"
        >
          Create List
        </Button>
      </div>
    </div>
  </form>
);

CreateChecklistForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTextFieldChange: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};

CreateChecklistForm.defaultProps = {};

export default withStyles(styles)(CreateChecklistForm);
