const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const app = express();
const { Pool } = require('pg');
const SECRET_KEY = 'yatusabes';
var jwt = require('jsonwebtoken');
const cors = require("cors");
const upload = require('express-fileupload');

//var ensureAuth = require('/middleware/authenticated.js');
//import { ensureAuth } from '/middleware/autenticated.js';

config = {
    user: 'postgres',
    host: 'localhost',
    password: 'new_password',
    database: 'postgres'
};

const pool = new Pool(config);

// Middleware del JWT

ensureAuth = function(req, res, next) {

    console.log('ACAA!!')
    console.log(req.headers)

    var token = req.headers['access-token'];
    console.log(req.headers['access-token']);

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(403).send({ message: "Token inválida" });
            } else {
                req.decoded = decoded;
                console.log(decoded)
                console.log('Token OK.');
                next();
            }
        });
    } else {
        console.log('Token no proveída');
        //res.redirect('/')
        res.status(403).send({ mensaje: 'Token no proveída' });
    }
};

//////////////////////////////////////////


const getUsers = async(req, res) => {
    try {
        //console.log(req.params.name)
        //let name = req.params.name
        //let data = await pool.query('select * from users where username = $1', [name])
        let data = await pool.query('select * from users');
        res.json(data.rows);
        console.log(data.rows);
    } catch (error) {
        console.log(error);
        return { message: error };
    }
}

const getNews = async(req, res) => {
    try {
        let data = await pool.query('select * from news')
        res.json(data.rows);
        console.log(data.rows);
    } catch (error) {
        console.log(error);
        return { message: error };
    }
}

const getInterviews = async(req, res) => {
    try {
        let data = await pool.query('select * from interviews');
        res.json(data.rows)
        console.log(data.rows)
    } catch (error) {
        console.log(error)
        return { message: error }
    }
}


const login = async(req, res, next) => {
    try {
        let status = false;
        let i = 0;
        let result = await pool.query('SELECT * from users WHERE (username = $1) and (password = $2)', [req.body.username, req.body.password]);
        //console.log(result);
        //console.log(result.rows[0].id);
        if (result.rowCount) {
            /*             const accessToken = jwt.sign({ id: result[0].id }, SECRET_KEY);
                        const dataUser = Object.assign({}, result[0], { accessToken: accessToken }); */
            const accessToken = jwt.sign({ id: result.rows[0].id }, SECRET_KEY);
            const dataUser = Object.assign({ accessToken: accessToken });
            console.log('DATA USER:', dataUser)
            res.send(dataUser);
            res.status(200).json('Usuario y/o contraseña correctos');
        } else {
            res.status(500).json('Usuario y/o contraseña errónea');
        }

    } catch (error) {
        console.log(error);
        return { message: error };
    }
};


/* const expiresIn = 3600;
const accessToken = jwt.sign({​​ id: result[0].id }​​, SECRET_KEY);
const dataUser = Object.assign({​​}​​, result[0], {​​ accessToken: accessToken }​​)
res.send(dataUser);
 */


const newNews = async(req, res) => {
    try {
        console.log(req.body);
        let newsInfo = req.body;
        console.log(req.body);
        let q = await pool.query('insert into news (id, picture, title, text, time_cr, time_ed) values ($1, $2, $3, $4, $5, $6)', [req.body.id, req.body.picture, req.body.title, req.body.text, req.body.time_cr, req.body.time_ed]);
        console.log(q);
        res.status(200).json(newsInfo);
    } catch (error) {
        console.log(error);
        return { message: error };
    }
}

const newInterviews = async(req, res) => {
    try {
        console.log(req.body)
        let interviewsInfo = req.body
        console.log(req.body)
        let q = await pool.query('insert into interviews (id, picture, title, text, time_cr, time_ed) values ($1, $2, $3, $4, $5, $6)', [req.body.id, req.body.picture, req.body.title, req.body.text, req.body.time_cr, req.body.time_ed])
        console.log(q)
        res.status(200).json(interviewsInfo)
    } catch (error) {
        console.log(error)
        return { message: error }
    }
}

const delNews = async(req, res) => {
    try {
        console.log(req.params.id)
        let q = await pool.query('delete from news where id = $1', [req.params.id])
        console.log(q)
        console.log(`Noticia con ID = ${req.params.id} borrada`)
        res.status(200).json(req.params)
    } catch (error) {
        console.log(error)
        return { message: error }
    }
}

const delInterviews = async(req, res) => {
    try {
        console.log(req.params.id)
        let q = await pool.query('delete from interviews where id = $1', [req.params.id])
        console.log(q)
        console.log(`Entrevista con ID = ${req.params.id} borrada`)
        res.status(200).json(req.params)
    } catch (error) {
        console.log(error)
        return { message: error }
    }
}

const updateNews = async(req, res) => {
    try {
        console.log(req.params.id)
        console.log(req.body)
        let q = await pool.query('UPDATE news SET picture = $2 , title = $3, text = $4 WHERE id = $1', [req.params.id, req.body.picture, req.body.title, req.body.text])
        console.log(q)
        console.log(`Noticia con ID = ${req.params.id} modificada`)
        res.status(200).json('Noticia modificada')
    } catch (error) {
        console.log(error)
        return { message: error }
    }
}

const updateInterviews = async(req, res) => {
    try {
        console.log(req.params.id)
        console.log(req.body)
        let q = await pool.query('UPDATE interviews SET picture = $2 , title = $3, text = $4 WHERE id = $1', [req.params.id, req.body.picture, req.body.title, req.body.text])
        console.log(q)
        console.log(`Entrevista con ID = ${req.params.id} modificada`)
        res.status(200).json('Entrevista modificada')
    } catch (error) {
        console.log(error)
        return { message: error }
    }
}



// SETTINGS
app.set('appName', 'SN_para_todos_App')
app.set('port', 3000)
    //app.set('view engine', 'ejs')


// MIDDLEWARES
app.use(express.json()) // para decirle a EXPRESS que entienda los objetos de JS, los formatos json
app.use(morgan('dev'))

/*     // Add headers
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
}); */

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, access-token, Content-Type, content-type, Accept, Authorization");
    next();
});



// ROUTES
app.get('/', (req, res) => {
    res.status(200).json({ status: "SN para todos BACKEND running" })
})

app.post('/login', login)

app.get('/news', ensureAuth, getNews)

app.get('/interviews', ensureAuth, getInterviews)

app.get('/users', ensureAuth, getUsers)

app.post('/news', ensureAuth, newNews)

app.post('/interviews', ensureAuth, newInterviews)

app.delete('/news/:id', ensureAuth, delNews)

app.delete('/interviews/:id', ensureAuth, delInterviews)

app.put('/news/:id', ensureAuth, updateNews)

app.put('/interviews/:id', ensureAuth, updateInterviews)

///////////////////////////////////////////////////////////////////////////////////////////////////////////


// Aquí inicia el servidor :-)
app.listen(app.get('port'), () => {
    console.log(app.get('appName'))
    console.log('Server on port', app.get('port'))
})