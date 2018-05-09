import React, { Component } from 'react';
import Header from './Header';
import Rounds from './Rounds';
import AddRound from './AddRound';
import axios from '../axios'
class PlayGame extends Component {
    state = {
        players: ['', '', '', ''],
        rounds: [[0, 0, 0, 0]],
        totals: [0, 0, 0, 0],
        sumOfScore: 0
    }
    componentDidMount() {
        axios
            .get(`/api/game/${this.props.match.params.gameId}`)
            .then(data => {
                console.log(data);
                this.setState({
                    rounds: data.data.scores,
                    players: data.data.players,
                    sumOfScore: data.data.sumOfScore,
                    totals: data.data.totals
                });
            })
            .catch(err => console.error(err));
    }
    _onAddRound = () => {
        let rounds = this.state.rounds;
        rounds.push([0, 0, 0, 0]);
        this.setState({ rounds })
        axios
            .post(`/api/game/${this.props.match.params.gameId}/addRound`, { row: this.state.rounds.length - 1 })
            .then(data => console.log(data.data))
            .catch(err => console.error(err))
    }
    _onChangeScore = (index, player, value) => {
        if (isNaN(value)) {
            return;
        }
        else {
            let rounds = this.state.rounds;
            rounds[index][player] = value;
            let totals = this.state.totals;
            let sum = 0, sumOfScore = 0;
            for (let i = 0; i < rounds.length; i++) {
                sum = sum + parseInt(rounds[i][player], 10);
            }
            totals[player] = sum;
            for (let i = 0; i < 4; i++) {
                sumOfScore += parseInt(totals[i], 10);
            }
            this.setState({ rounds });
            this.setState({ totals });
            this.setState({ sumOfScore })
            axios
                .post(`api/game/${this.props.match.params.gameId}`, {
                    scores: this.state.rounds[index],
                    row: index,
                    totals: this.state.totals,
                    sumOfScore: this.state.sumOfScore
                })
        }
    }
    render() {
        return (
            <div className="container">
                <Header />
                <Rounds players={this.state.players} sumOfScore={this.state.sumOfScore} rounds={this.state.rounds} totals={this.state.totals} onChangeScore={this._onChangeScore} />
                <AddRound onAddRound={this._onAddRound} />
            </div>
        );
    }
}
export default PlayGame;