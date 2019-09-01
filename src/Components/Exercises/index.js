import React, { Component, Fragment } from 'react';
import {
  List,
  Grid,
  Paper,
  Typography,
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import { withContext } from '../context';
import Form from './Form';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginTop: 5,
      height: 'calc(100% - 10px)'
    },
    [theme.breakpoints.down('xs')]: {
      height: '100%'
    }
  },
  '@global': {
    'html, body, #root': {
      height: '100%'
    }
  },
  container: {
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100% - 56px - 48px)'
    },
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px - 48px)'
    }
  },
  item: {
    [theme.breakpoints.down('xs')]: {
      height: '50%'
    }
  }
});

class Exercises extends Component {
  render() {
    const {
      classes,
      exercise,
      exercisesByMuscles,
      category,
      editMode,
      muscles,
      onSelect,
      onDelete,
      onSelectEdit,
      onEdit,
      exercise: {
        id,
        title = 'Welcome!',
        description = 'Please select an exercise from the list on the left.'
      }
    } = this.props;

    return (
      <Grid container className={classes.container}>
        <Grid item className={classes.item} xs={12} sm={6}>
          <Paper className={classes.paper}>
            {exercisesByMuscles.map(([group, exercises]) =>
              !category || category === group ? (
                <Fragment key={group}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {group}
                  </Typography>
                  <List component="ul">
                    {exercises.map(({ id, title }) => (
                      <ListItem key={id} button onClick={() => onSelect(id)}>
                        <ListItemText primary={title} />
                        <ListItemSecondaryAction>
                          <IconButton
                            color="secondary"
                            onClick={() => onSelectEdit(id)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => onDelete(id)}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Fragment>
              ) : null
            )}
          </Paper>
        </Grid>
        <Grid item className={classes.item} xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4" color="secondary" gutterBottom>
              {title}
            </Typography>
            {editMode ? (
              <Form
                key={id}
                exercise={exercise}
                muscles={muscles}
                onSubmit={onEdit}
              />
            ) : (
              <Typography variant="body1">{description}</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withContext(withStyles(styles)(Exercises));
