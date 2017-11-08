import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { Provider } from 'react-redux';
import configureStore from '../redux/store/configureStore';
import { loadMerchants } from '../redux/actions/MerchantActions';
import MainWindow from './main/MainWindow';
import indigo from 'material-ui/colors/indigo';
import orange from 'material-ui/colors/orange';

const store = configureStore();
store.dispatch(loadMerchants());

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: orange,
  },
  status: {
    danger: 'orange',
  },
});

// const theme = createMuiTheme();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider  theme={theme}>
            <MainWindow />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;

ReactDOM.render((
  <App />
), document.getElementById('root'));
