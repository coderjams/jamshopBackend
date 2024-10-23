// const expressJwt = require('express-jwt');
const { expressjwt: expressJwt } = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`
        ]
    });
}

async function isRevoked(_req, _payLoad) {

    const { payload } = _payLoad

    if (payload.isAdmin) return false;

    return true;

}

module.exports = authJwt;