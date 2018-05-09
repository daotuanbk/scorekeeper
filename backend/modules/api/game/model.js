const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    players : {type: [String]},
    scores : {type: [[String]], default: [[0,0,0,0]]},
    totals : {type: [Number],default: [0,0,0,0]},
    sumOfScore : {type: Number,default: 0}
},{
    timestamps: true
    }
)
module.exports = mongoose.model("Game",gameSchema);