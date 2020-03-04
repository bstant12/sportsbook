const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema


const BetSchema = new Schema({
  home_team: {
    type: String
  },
  away_team: {
    type: String
  },
  site:{
    type: String
  },
  bet_type: {
    type:String
  },
  my_odds: {
    type: String
  },
  amount: {
    type: Number
  }
}, {timestamps: true})

mongoose.model("bets", BetSchema);


const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },

  bets :[BetSchema]
  
}, {timestamps: true});

module.exports = Bet = mongoose.model("bets", BetSchema)
module.exports = User = mongoose.model("users", UserSchema);