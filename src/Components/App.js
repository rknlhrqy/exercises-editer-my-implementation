import React, { Component, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Header, Footer } from './Layouts';
import Exercises from './Exercises';
import { muscles, exercises } from '../Data';
import { Provider } from './context';

export default class extends Component {
  state = {
    exercises,
    category: '',
    exercise: {},
    editMode: false
  };

  getExercisesByMuscles = () => {
    const initialExercises = muscles.reduce(
      (exercises, category) => ({
        ...exercises,
        [category]: []
      }),
      {}
    );
    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;
        exercises[muscles] = [...exercises[muscles], exercise];
        return exercises;
      }, initialExercises)
    );
  };

  handleCategorySelect = category => this.setState({ category });

  handleExerciseSelect = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(each => each.id === id),
      editMode: false
    }));

  handleExerciseCreate = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [...exercises, exercise]
    }));

  handleExerciseDelete = id =>
    this.setState(({ exercises, exercise, editMode }) => ({
      exercises: exercises.filter(each => each.id !== id),
      editMode: exercise.id === id ? false : editMode,
      exercise: exercise.id === id ? {} : exercise
    }));

  handleExerciseSelectEdit = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: true
    }));

  handleExerciseEdit = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [
        ...exercises.filter(each => each.id !== exercise.id),
        exercise
      ],
      exercise
    }));

  getContext = () => ({
    exercisesByMuscles: this.getExercisesByMuscles(),
    muscles,
    ...this.state,
    onSelect: this.handleExerciseCreate,
    onCreate: this.handleExerciseCreate,
    onCategorySelect: this.handleCategorySelect,
    onEdit: this.handleExerciseEdit,
    onSelectEdit: this.handleExerciseSelectEdit,
    onDelete: this.handleExerciseDelete
  });

  render() {
    return (
      <Provider value={this.getContext()}>
        <Fragment>
          <CssBaseline />
          <Header />
          <Exercises />
          <Footer />
        </Fragment>
      </Provider>
    );
  }
}
