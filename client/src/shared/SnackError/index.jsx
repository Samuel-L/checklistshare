import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import ErrorOutlineIcon from 'material-ui-icons/ErrorOutline';

const SnackError = props => (
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    open={props.open}
    onClose={props.handleClose}
    snackbarcontentprops={{
      'aria-describedby': 'message-id',
    }}
    message={
      <span id="message-id">
        <ErrorOutlineIcon color="secondary" /> {props.children}
      </span>
    }
    action={
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={props.handleClose}
      >
        <CloseIcon />
      </IconButton>
    }
  />
);

SnackError.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default SnackError;
