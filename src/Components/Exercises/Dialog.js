import React, { Fragment, Component } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Form from './Form';
import { withContext } from '../context';

class CreateDialog extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(({ open }) => ({ open: !open }));
  };

  handleSubmit = () => {
    // ToDo: validition
    const { exercise } = this.state;
    const { onCreate } = this.props;
    onCreate({
      ...exercise,
      id: exercise.title.toLocaleLowerCase().replace(/ /g, '-')
    });
    this.setState({
      exercise: {
        title: '',
        description: '',
        muscles: ''
      }
    });
  };

  handleFormSubmit = exercise => {
    const { onCreate } = this.props;
    this.handleToggle();
    console.log('submit', exercise);
    onCreate(exercise);
  };

  render() {
    const { open } = this.state;
    const { muscles } = this.props;
    return (
      <Fragment>
        <Fab size="small" onClick={this.handleToggle} color="secondary">
          <Add />
        </Fab>
        <Dialog open={open} onClose={this.handleToggle} fullWidth maxWidth="xs">
          <DialogTitle>Create a new exercise</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below.
            </DialogContentText>
            <Form muscles={muscles} onSubmit={this.handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default withContext(CreateDialog);
