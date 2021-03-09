const apiRouter = require('express').Router()

const {
    getUser
} = require('../db')

apiRouter.post('/login', async (req, res, next) => {
const {username, password} = req.body
try {
    const userObj = await getUser(username)
    console.log('the userObj in the routes: ', userObj)
    res.send(userObj)
} catch (error){
    console.log('error in the routes: ', error)
}

})


module.exports = apiRouter

