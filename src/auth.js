const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

function sign( payload ) {
    return jwt.sign( payload, SECRET, { expiresIn: '2h' } );
    
}

function authMiddleware( req, res, next ) {
    const header = req.headers.authorization;

    if ( !header ) {
        return res.status(401).json({ error: 'Falta Autorización' });
    }

    const [ type, token ] = header.split(' ');

    if ( type !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Formato Inválido' });
    }

    try {
        req.user = jwt.verify(token, SECRET);
        return next();

    } catch (error) {
        return res.status(401).json({ error: 'Token Inválido' });
    }

}

function requireRole(...roles) {
    return (req, res, next) => {
        if( !roles.includes(req.user.role)){
            return res.status(403).json({ error: 'No autorizado' });
        };
        next();
    };
};

module.exports = { sign, authMiddleware, requireRole };