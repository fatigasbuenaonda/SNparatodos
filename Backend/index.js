const { Pool } = require('pg');

config = {
    user: 'postgres',
    host: 'localhost',
    password: 'new_password',
    database: 'postgres'
};

const pool = new Pool(config);

/*
app.get('/users', getUsers)

app.get('/user', (req, res) => {
    res.send('Respuesta del GET')
    getUsers()
     res.json({
        username: 'Fatiga',
        lastname: 'Gonzalez',
        edad: 56
    }) 
})
*/.

const getUsers = async() => {
    try {
        const res = await pool.query('select * from users')
        console.log(res.rows)
            //pool.end()
            //console.log('Getting BOOKS!!')
    } catch (error) {
        console.log(error)
    }
}

const insertUser = async() => {
    try {
        const text = 'INSERT INTO users(username, password) VALUES ($1, $2)'
        const values = ['john', 'john1234']

        const res = await pool.query(text, values)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async() => {
    try {
        const text = 'DELETE from users WHERE username = $1'
        const value = ['john']

        const res = await pool.query(text, value)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async() => {
    try {
        const text = 'UPDATE users SET username = $1 WHERE username = $2'
        const value = ['Juancito', 'Pepito']

        const res = await pool.query(text, value)
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

//getUsers()
//insertUser()
//deleteUser()
//updateUser()