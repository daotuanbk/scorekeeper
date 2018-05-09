const express = require("express");
const router = express.Router();

const gameController = require("./controller");

router.post('/', (req,res) => {
    gameController
    .createGame(req.body)
    .then(result => res.send(result))
    .catch(err => {
        console.error(err);
        res.status(500).send(err)
    })
})

router.post('/:id', (req,res) => {
    gameController
    .updateGame(req.params.id, req.body)
    .then(result => res.send(result))
    .catch(err => {
        console.error(err);
        res.status(500).send(err);
    })
})

router.post('/:id/addRound', (req,res) => {
    gameController
    .addRound(req.params.id, req.body)
    .then(result => res.send(result))
    .catch(err => {
        console.error(err);
        res.status(500).send(err);
    })
})

router.get('/:id', (req, res) => {
    gameController
    .getGame(req.params.id)
    .then(result => res.send(result))
    .catch(err => {
        console.error(err);
        res.status(500).send(err);
    })
})
module.exports = router;