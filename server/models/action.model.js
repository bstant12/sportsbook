const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

const ActionSchema = new mongoose.Schema({

    ///////////////////////////////////////////////////////////////
        // PUT SERVER STUFF HERE
    ///////////////////////////////////////////////////////////////

}, {timestamps:true});

ActionSchema.plugin(uniqueValidator);

const Action = mongoose.model("Action", ActionSchema);

module.exports = Action;