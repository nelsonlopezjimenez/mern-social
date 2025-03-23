//  users.controller
import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from '../helpers/dbErrorHandler'

const create = async (req, res) => {
    const user = new User (req.body); cl('line7', req.body)
    try {
        await user.save();
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
            // message: err
        });
    }
};
// curl -d "key=value&key=value2" -X POST URL
// curl -d "name=value&email=value2&password=val3" -X POST URL
// curl -d "name=naranja&email=naranje@col.edu&password=1234" -X POST URL
// curl https://reqbin.com/echo/get/json -H "Accept: application/json"
// -H "Authorization: Bearer {token}"

const list = async (req, res) => {
    try {
        let users = await User.find().select("password name email updated created");
        res.json(users);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const userById = async (req, res, next, id) => {
    cl('### 38 id ### ', id); 
    try {
        let user = await User.findById(id)
        if (!user){
            return res.status('400').json({
                error: "User not found"
            })
        }
        req.profile = user;
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
};
function cl (m, i) {
    console.log(m, i)
}
const update11 = async (req, res) => {
    try {
        let user = req.profile; 
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save();
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err + " ##### 66")
        })
    }
}
// const updateSpreadSyntax = async (req, res) => {
const update = async (req, res) => {
    try {
        let user = req.profile; 
        let filter = {_id: user._id}
        const update = {...req.body};
        await User.findOneAndUpdate(filter, update)
        user.updated = Date.now();
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err + " ##### 66")
        })
    }
}
const remove = async (req, res) => {
    try {
        let user = req.profile;
        // let deletedUser = await user.remove() // original and deprecated FAILED
        // let deletedUser = await user.deleteOne({_id: user._id}) // INSTANCE OK
        let deletedUser = await User.findOneAndDelete({_id: user._id}) //MODEL OK
        res.status(201).json(deletedUser)
    } catch (err) {
        cl("89 ", err)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const read =  (req, res) => {
    return res.json(req.profile)
}

export default {
    create,
    list,
    update,
    remove,
    userById,
    read,
}

30


// https://stackoverflow.com/questions/46995522/findoneandupdate-is-not-a-function
// The solution is to run functions on a model, not on a instance of it. So instead of:

// var NewUser = new User(req.user);
// NewUser.findOneAndUpdate...
// Do:

// User.findOneAndUpdate...