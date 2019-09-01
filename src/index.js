import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import App from './Components/App';
import { red, amber } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: {
      main: amber.A400,
      // main: amber[500]
      // main:'#FFC107'
      light: amber[200],
      dark: amber[800]
    },
    type: 'dark',
    spacing: {
      unit: 10
    }
  }
});
const rootElement = document.getElementById('root');
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  rootElement
);
