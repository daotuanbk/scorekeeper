const homeModel = require('./model');

const getAllPlayersName = () => new Promise((resolve, reject) => {
  homeModel.find({})
    .sort({ createAt: -1 })
    .select('players')
    .exec()
    .then(data => resolve(data))
    .catch(err => reject(err))
})

const createPlayer = ({players}) => new Promise((resolve, reject) => {
  homeModel.create({players})
    .then(data => resolve({id: data._id}))
    .catch(err => reject(err))
})

const updatePlayerName = (id, { playersName }) => new Promise((resolve, reject) => {
  homeModel.update({
    _id: id
  }, {
      playersName
    })
    .then(data => resolve({ _id: data._id }))
    .catch(err => reject(err))
})

module.exports = {
  getAllPlayersName,
  updatePlayerName,
  createPlayer
}