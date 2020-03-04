const UserController = require('../controllers/users.controller');
const BetController = require('../controllers/users.controller');

module.exports = (app) => {
    app.get('/api/users', UserController.index);            //all
    app.get('/api/user/:id', UserController.show);          //one
    app.post('/api/user', UserController.create);           //make one
    app.put('/api/user/:id', UserController.update);        //update
    app.delete('/api/user/:id', UserController.destroy);    //delete

    app.post('/api/bet', BetController.create);

}