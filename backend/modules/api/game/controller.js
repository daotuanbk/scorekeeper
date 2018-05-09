const gameModel = require("./model");

const updateGame = (id, { scores, row, totals, sumOfScore }) => new Promise((resolve, reject) => {
    gameModel.update({
        _id: id
    }, {
            $set: {
                [`scores.${row}`]: scores,
                totals,
                sumOfScore
            }
        })
        .then(data => resolve({ id: data._id }))
        .catch(err => reject(err))
})

const createGame = ({ players }) => new Promise((resolve, reject) => {
    gameModel.create({
        players
    })
        .then(data => resolve({ id: data._id }))
        .catch(err => reject(err))
})

const addRound = (id, {row} ) => new Promise((resolve, reject) => {
    const scores = [0, 0, 0, 0]
    gameModel.update({
        _id: id
    }, {
            $set: {
                [`scores.${row}`]: [0, 0, 0, 0]
            }
        })
        .then(data => resolve({ id: data._id }))
        .catch(err => reject(err))
})

const getGame = id => new Promise((resolve, reject) => {
    gameModel.findOne({ _id: id })
        .select('players scores totals sumOfScore')
        .exec()
        .then(data => resolve(data))
        .catch(err => reject(err))
})
module.exports = {
    createGame,
    updateGame,
    addRound,
    getGame
}
