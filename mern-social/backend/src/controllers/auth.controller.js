//   controllers/auth.controller.js
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import {expressjwt} from 'express-jwt';

// curl -d "key=value&key=value2" -X POST URL
// curl -d "name=value&email=value2&password=val3" -X POST URL
// curl -d "name=naranja&email=naranje@col.edu&password=1234" -X POST /auth/signin

// curl https://reqbin.com/echo/get/json -H "Accept: application/json"
// -H "Authorization: Bearer {token}"

// fetch(url, {headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Q4NjM0ZTM3Y2E5ZDJiYWI0ZDY1N2YiLCJpYXQiOjE3NDI0MTUyMTB9._4Qim829Fg0PfRO4VnrFQ--MW4EodL9rMRULGkx7_zQ'}}).then(r => r.json()).then(n => console.log(n))
// Promise {<pending>}
// VM1410:1 {password: '123456', _id: '67d8634e37ca9d2bab4d657f', name: 'Hugo Lope', email: 'hugo@col.edu', created: '2025-03-17T18:00:39.864Z', …}

const signin = async (req, res) => {
    console.log(req.body)
    try {
        let user = await User.findOne({
            'email': req.body.email
        })
        if (!user) return res.status('401').json({
            error: "User not found"
        })
        if (!user.authenticate(req.body.password)) {
            return res.status('401').send({
                error: 'Email and password do not match.'
            })
        }
        const token = jwt.sign({
             _id: user._id
        }, "THISISMYSECRET")
        res.cookie('t', token, { expire: new Date() + 9999 })
        return res.json({
            builtUrl: `http://localhost:3000/api/v2/users/${user._id}`,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        return res.status('401').json({error: 'Could not sign in'})
    }
}
const signout = (req, res) => {
    res.clearCookie('t');
    return res.status('200').json({
        message: "signed out"
    })
}
const requiresSignin = expressjwt({
    secret: 'THISISMYSECRET',
    algorithms: ["HS256"],
    userProperty: 'auth',
})
const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
        return res.status('403').json({
            error: 'User is not authorized'
        })
    }
    next();
}

export default {
    signin, 
    signout,
    requiresSignin,
    hasAuthorization,
}