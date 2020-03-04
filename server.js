const express = require('express'),
    app = express(),
    port = 8000,
    cors = require('cors'),
    bodyParser = require("body-parser"),
    server = app.listen(port, () => console.log(`Listening on port ${server.address().port}`));

const passport = require("passport");

const users = require("./server/routes/api/users");


app.use(bodyParser.urlencoded({extended:false}));



app.use(express.json(),express.urlencoded({extended:true}), cors());


app.use(passport.initialize());

require("./server/config/passport")(passport);

app.use("/api/users", users);


require('./server/config/database.config');
require('./server/routes/users.routes')(app);