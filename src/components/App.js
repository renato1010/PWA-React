import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomeComponent from './home/HomeComponent';
import './app.css';
import { getTodosLosPartidos } from './aux-funcs/axios-help-funcs';

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: false,
      isLoaded: false,
      partidos: []
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this.setState({ isLoading: true });
    getTodosLosPartidos()
      .then(partidosArr => {
        this.successHandler(partidosArr);
      })
      .catch(err => {
        console.log(err);
        this.failureHandler();
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  successHandler = response => {
    this._isMounted && this.setState({ partidos: response, isLoaded: true, isLoading: false });
  };
  failureHandler = () => {
    this._isMounted && this.setState({ isLoaded: false, isLoading: false });
  };
  render() {
    return (
      <div id="root">
        <MuiThemeProvider>
          <HomeComponent partidos={this.state.partidos} isLoaded={this.state.isLoaded} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
