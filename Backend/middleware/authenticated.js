var jwt = require('jsonwebtoken');

exports.ensureAuth = function(req, res, next) {

    var token = req.headers['access-token'];

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