const express = require('express'); //require express
const expHbs = require('express-handlebars'); //require handlebars
const path = require('path'); //require path for working with different OC pathes

const app = express(); //create our server

const dataBase = require('./dataBase').getInstance();
dataBase.setModels();

app.use(express.json()); //teach our express read JSON files
app.use(express.urlencoded({extended: true})); //teach our express parse JSON files;
app.use(express.static(path.join(__dirname, 'static'))); // teach our express works with static directory

app.engine('.hbs', expHbs({ // setting our template engine
    extname: '.hbs',
    defaultLayout: null //important thing!!!
}));

app.set('view engine', '.hbs'); // our engine will be .hbs files
app.set('views', path.join(__dirname, 'static')); // specify directory where are our .hbs files

//MODULES
const {render404} = require ('./controllers');
const {usersRouter, housesRouter, authRouter} = require('./router');
//ROUTES
app.use('/users', usersRouter);
app.use('/houses', housesRouter);
app.use('/auth', authRouter);
//404
app.all('*', render404.render404Page);

app.listen(5000, () => { //create our server port-listener
    console.log('listen port: 5000');
});

