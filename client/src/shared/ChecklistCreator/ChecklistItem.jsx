import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = () => ({
  root: {
    margin: '5px',
  },
  textField: {
    width: '90%',
  },
  icon: {
    minWidth: '5%',
    maxWidth: '10%',
    color: 'white',
    backgroundColor: 'lightCoral',
    marginLeft: '3px',
    padding: '2px 4px',
    '&:hover': {
      backgroundColor: 'red',
      boxShadow: 'none',
    },
  },
});

const ChecklistItem = props => (
  <div key={props.item.id} className={props.classes.root}>
    <TextField
      className={props.classes.textField}
      required
      id={`item-${props.item.id}`}
      label="Item"
      value={props.item.name}
      onChange={props.handleItemTextChange(props.idx)}
      margin="normal"
    />
    <Button
      className={props.classes.icon}
      id="delete-item-button"
      aria-label="delete"
      onClick={() => { props.handleItemDelete(props.idx); }}
      variant="raised"
    >
      <DeleteIcon />
    </Button>
  </div>
);

ChecklistItem.propTypes = {
  idx: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  handleItemTextChange: PropTypes.func.isRequired,
  handleItemDelete: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(ChecklistItem);
