import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomeComponent from './home/HomeComponent';
import './app.css';
import { getTodosLosPartidos } from './aux-funcs/axios-help-funcs';

class App extends Component {
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
    this.setState({ isLoading: true });
    getTodosLosPartidos()
      .then(partidosArr => {
        this.setState({ partidos: partidosArr, isLoaded: true, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoaded: false, isLoading: false });
        console.log(err);
      });
  }
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
