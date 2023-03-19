async function isUser( req, res, next ) {
    console.log("isUser function hit in api/utils")
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
    console.log("isAdmin function hit in api/utils")
    if (!req.Admin) {
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