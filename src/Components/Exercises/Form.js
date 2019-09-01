import React, { Component } from 'react';
import {
  TextField,
  Select,
  Button,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';

export default class extends Component {
  state = this.getInitState();

  getInitState() {
    const { exercise } = this.props;
    return exercise
      ? exercise
      : {
          title: '',
          description: '',
          muscles: ''
        };
  }

  // handleChange = name => event => {
  //   this.setState(prevState => ({
  //     exercise: {
  //       ...prevState.exercise,
  //       [name]: event.target.value
  //     }
  //   }));
  // };
  // handleChange = name => event => {
  //   this.setState(({ exercise }) => ({
  //     exercise: {
  //       ...exercise,
  //       [name]: event.target.value
  //     }
  //   }));
  // };

  handleChange = name => ({ target: { value } }) =>
    this.setState({
      [name]: value
    });

  handleSubmit = () => {
    // ToDo: validition
    const { onSubmit } = this.props;
    onSubmit({
      id: this.state.title.toLocaleLowerCase().replace(/ /g, '-'),
      ...this.state
    });
  };
  render() {
    const { muscles: categories, exercise } = this.props;
    const { title, description, muscles } = this.state;

    return (
      <form>
        <TextField
          label="Title"
          value={title}
          onChange={this.handleChange('title')}
          margin="normal"
          fullWidth
        />
        <br />
        <FormControl fullWidth>
          <InputLabel htmlFor="muscles">Muscles</InputLabel>
          <Select value={muscles} onChange={this.handleChange('muscles')}>
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <TextField
          label="Description"
          multiline
          rows="4"
          value={description}
          onChange={this.handleChange('description')}
          margin="normal"
          fullWidth
        />
        <br />
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleSubmit}
          disabled={!title || !muscles}
        >
          {exercise ? 'Edit' : 'Create'}
        </Button>
      </form>
    );
  }
}
