const express = require('express'); //require express
const path = require('path'); //require path for working with different OC path
const fileUpload = require('express-fileupload'); //require  fileUpload

const app = express(); //create our server
const dataBase = require('./dataBase').getInstance();
dataBase.setModels();

app.use(fileUpload()); //use our fileUpload for all our Routes
app.use(express.json()); //teach our express read JSON files
app.use(express.urlencoded({extended: true})); //teach our express parse JSON files;
app.use(express.static(path.join(__dirname, 'static'))); // teach our express works with static directory
global.appRoot = __dirname; //Our main directory.

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
    console.log(
        '██╗  ██╗███████╗██╗     ██╗      ██████╗     ██╗   ██╗ ██████╗ ██╗   ██╗    ██╗  ██╗ █████╗ ██╗   ██╗███████╗    ███████╗████████╗ █████╗ ██████╗ ████████╗███████╗██████╗     ██╗     ██╗   ██╗███╗   ██╗\n' +
        '██║  ██║██╔════╝██║     ██║     ██╔═══██╗    ╚██╗ ██╔╝██╔═══██╗██║   ██║    ██║  ██║██╔══██╗██║   ██║██╔════╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗    ██║     ██║   ██║████╗  ██║\n' +
        '███████║█████╗  ██║     ██║     ██║   ██║     ╚████╔╝ ██║   ██║██║   ██║    ███████║███████║██║   ██║█████╗      ███████╗   ██║   ███████║██████╔╝   ██║   █████╗  ██║  ██║    ██║     ██║   ██║██╔██╗ ██║\n' +
        '██╔══██║██╔══╝  ██║     ██║     ██║   ██║      ╚██╔╝  ██║   ██║██║   ██║    ██╔══██║██╔══██║╚██╗ ██╔╝██╔══╝      ╚════██║   ██║   ██╔══██║██╔══██╗   ██║   ██╔══╝  ██║  ██║    ██║     ██║   ██║██║╚██╗██║\n' +
        '██║  ██║███████╗███████╗███████╗╚██████╔╝       ██║   ╚██████╔╝╚██████╔╝    ██║  ██║██║  ██║ ╚████╔╝ ███████╗    ███████║   ██║   ██║  ██║██║  ██║   ██║   ███████╗██████╔╝    ███████╗╚██████╔╝██║ ╚████║\n' +
        '╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝        ╚═╝    ╚═════╝  ╚═════╝     ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═════╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝\n' +
        '                                                                                                                                                                                                          \n');
});

