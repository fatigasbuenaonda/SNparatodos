//console.log('Servidor SN_para_todos corriendo! :-)')

const PORT = 8080

// for (let i = 1; i < 5; i++) {
//    require('http').createServer((req, res) => res.end(`Server ${PORT+i} en una sola linea de codigo`)).listen(PORT + i, () => console.log(`Srv Lst ${PORT+i}`))
// } 

const http = require('http')

let contadorVisitas = 0
const server = http.createServer((req, res) => {
    //console.log(req)
    let url = req.url
    console.log(url)
    if (url == '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write('<h2>Hola Node</h2>')
        res.write(`<h3 style="color:crimson;">Visitas: ${++contadorVisitas}</h3>`)
        res.end(`<p style="color:purple;">La fecha y hora es ${new Date().toLocaleString()}</p>`)
    } else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.end(`<h2 style="color:red;">Error 404 Recurso <span style="color:orange">${url}</span> no encontrado</h2>`)
    }
})

server.listen(PORT, err => {
    if (err) return console.log(`Error en Servidor ${err}`)
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})