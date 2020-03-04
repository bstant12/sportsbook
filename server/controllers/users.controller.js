const users = require('../models/User.model');
const bets = require('../models/User.model');


module.exports = {

    index: (req, res) => {
        users.find()
            .then(results => res.json(results))
            .catch(err => res.status(400).json(err.errors));
    },

    create: (req, res) => {
        users.create(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err.errors));
    },

    show: (req, res) => {
        users.findById({_id:req.params.id})
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err.errors))
    },

    update: (req, res) => {
        users.findOneAndUpdate({_id:req.params.id}, req.body, 
            {runValidators:true, useFindAndModify:true, context:'query'})
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err.errors));
    },

    destroy: (req, res) => {
        users.deleteOne({_id:req.params.id})
            .then(result => res.json(result))
            .catch(err => res.status(400).json(err.errors));
    },

    create: (req, res) => {
        bets.create(req.body)
            .then(result => res.json(result))
            .then(users.findOneAndUpdate({_id: req.params.id}, {$push: {bets: data}}))
            .catch(err => console.log(err))
    }

}