import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';

const styles = theme => ({
  checklistTitle: {
    marginTop: '20px',
  },
  listGridRoot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  checkbox: {
    color: '#57c557 !important',
  },
  button: {
    [theme.breakpoints.up('lg')]: {
      position: 'fixed',
      right: '10%',
      top: '20%',
      width: '150px !important',
    },
    width: '100%',
    backgroundColor: theme.palette.primary.A700,
  },
});

const ListComponent = props => (
  <Grid container justify="center">
    <Grid item xs={12}>
      <Typography
        className={props.classes.checklistTitle}
        variant="headline"
        align="center"
        gutterBottom
      >
        {props.checklist.title}
      </Typography>
    </Grid>
    <Grid item className={props.classes.listGridRoot}>
      <List>
        {
          props.checklist.items.map(item => (
            <ListItem
              key={item.id}
              dense
              button
              onClick={props.toggleList(item.id)}
            >
              <Checkbox
                className={props.classes.checkbox}
                checked={props.checked.indexOf(item.id) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={item.name} />
            </ListItem>
          ))
        }
      </List>
    </Grid>
    <Grid item xs={12}>
      <Button

        variant="raised"
        color="primary"
        className={props.classes.button}
        onClick={props.toggleEditMode}
      >
        Edit List
      </Button>
    </Grid>
  </Grid>
);

ListComponent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  checklist: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      List: PropTypes.number,
      name: PropTypes.string,
    })),
  }).isRequired,
  toggleList: PropTypes.func.isRequired,
  checked: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleEditMode: PropTypes.func.isRequired,
};

export default withStyles(styles)(ListComponent);
