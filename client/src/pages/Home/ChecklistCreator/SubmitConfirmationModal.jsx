import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: theme.spacing.unit * 50,
    padding: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  buttonGroup: {
    float: 'right',
    marginTop: '15px',
  },
  button: {
    boxShadow: 'none',
  },
});

const SubmitConfirmationModal = props => (
  <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={props.open}
    onClose={props.handleClose}
  >
    <div className={props.classes.paper}>
      <Typography variant="body1">
        Are you sure you want to create the list?
      </Typography>
      <div className={props.classes.buttonGroup}>
        <Button
          id="modal-yes-button"
          className={props.classes.button}
          variant="raised"
          color="primary"
          onClick={props.handleModalConfirm}
        >
          Yes
        </Button>
        <Button
          id="modal-no-button"
          className={props.classes.button}
          variant="flat"
          color="primary"
          onClick={props.handleClose}
        >
          No
        </Button>
      </div>
    </div>
  </Modal>
);

SubmitConfirmationModal.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleModalConfirm: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

SubmitConfirmationModal.defaultProps = {};

export default withStyles(styles)(SubmitConfirmationModal);
