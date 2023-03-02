async function isUser( req, res, next ) {
    if (!req.user) {
        res.status(401).send({
            error: "NotAthorized",
            message: "You must be logged in to perform this action",
            name: "notLoggedIn"
        })
    }
    next()
}

async function isAdministrator( req, res, next ) {
    if (!req.admin) {
        res.status(401).send({
            error: "NotAthorized",
            message: "You must be logged in to perform this action",
            name: "notLoggedIn"
        })
    }
    next()
}

module.exports = {
    isUser,
    isAdministrator
}