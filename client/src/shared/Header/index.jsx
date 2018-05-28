import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

const Header = props => (
  <AppBar position="static" className={props.classes.root}>
    <Toolbar>
      <Typography variant="title" color="inherit" className={props.classes.flex}>
        ChecklistShare
      </Typography>
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Header);
