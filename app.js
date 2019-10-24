const express = require('express'); //require express
const expHbs = require('express-handlebars');
const path = require('path'); //require path for working with different OC path
const fileUpload = require('express-fileupload'); //require  fileUpload

const app = express(); //create our server
const dataBase = require('./dataBase').getInstance();
dataBase.setModels();


const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', socket => {

    socket.on('joinRoom', data => {
        socket.join(data.room_id);

        console.log(data);
    });

    socket.on('msgToRoom', data => {
        console.log(data);
        io.to(data.room_id).emit('sendMsgToRoom', {id: data.socket_id, data: data.data})
    })
});

app.use(fileUpload()); //use our fileUpload for all our Routes
app.use(express.json()); //teach our express read JSON files
app.use(express.urlencoded({extended: true})); //teach our express parse JSON files;
app.use(express.static(path.join(__dirname, 'static'))); // teach our express works with static directory

app.engine('.hbs', expHbs({ // setting our template engine
    extname: '.hbs',
    defaultLayout: null //important thing!!!
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'static'));

global.appRoot = __dirname; //Our main directory.

//MODULES
const {render404} = require('./controllers');
const {usersRouter, housesRouter, authRouter} = require('./router');
//ROUTES
app.use('/users', usersRouter);
app.use('/houses', housesRouter);
app.use('/auth', authRouter);
//SupportPage
app.get('/support', (req, res) => {
    res.render('support')
});
//404
app.all('*', render404.render404Page);

http.listen(5000, () => { //create our server port-listener
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

