const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const commandesRouter = require('./routes/commandes');

const app = express();
const port = 3334

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/commandes', commandesRouter);
app.use('/', indexRouter);


app.listen(port, ()=> {
    console.log(`Serveur is listening at localhost:${port}`)
})

module.exports = app;
