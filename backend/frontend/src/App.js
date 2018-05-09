import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from './axios'
import config from './config'
import CreateGame from "./components/CreateGame";
import PlayGame from "./components/PlayGame";
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {

  state = {
    isCreated: false,
    players: ['', '', '', ''],
    id: ''
  };
  _handleChangeText = (index, name) => {
    let players = this.state.players
    players[index] = name
    this.setState({ players: players })
  }
  _onCreateNewGame = () => {
    this.setState({ isCreated: true })
    axios
      .post("/api/game", { players: this.state.players })
      .then(res => this.setState({ id: res.data.id }))
      .catch(err => console.error(err))
  };
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Route exact path='/' render={(props) => { return <CreateGame {...props} onCreateNewGame={this._onCreateNewGame} handleChangeText={this._handleChangeText} id={this.state.id}/> }} />

          <Route path='/game/:gameId' render={(props) => { return <PlayGame {...props} players={this.state.players}/> }
          } />
          {/* {this.state.isCreated ? <PlayGame players={this.state.players} id={this.state.id} /> : <CreateGame onCreateNewGame={this._onCreateNewGame} handleChangeText={this._handleChangeText} />} */}

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
