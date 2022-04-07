const express = require("express")
const jwt = require('jsonwebtoken')
const Controllers = require("../controllers/controllers")

const Router = express.Router()

Router.post('/signup', Controllers.Signup)

Router.post('/sendotp', Controllers.SendOTP)

Router.post('/login', Controllers.Login)

Router.post('/addBorrowRequest', authenticateToken, Controllers.AddBorrowRequest)

Router.get('/getBorrowRequests', authenticateToken, Controllers.GetBorrowRequests)

function authenticateToken (req, res, next) {
    const authHeaders = req.headers['authorization']
    if(authHeaders == null) return res.status(401).json({message: "No Authorization passed"})
    const accessToken = authHeaders.split(' ')[1]
    if(accessToken == null) return res.status(401).json({message: "No Access Token found"})

    jwt.verify(accessToken, process.env.JWT_KEY, (err, jwtObj) => {
        if(err) return res.status(401).json({message : 'access Token not matched'})
        req.body.mobileNumber = jwtObj.mobileNumber
        next()
    })
}

module.exports = Router