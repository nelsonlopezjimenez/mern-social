//  users.controller
import User from '../models/user.model';
// import extend from 'lodash/extend';
import errorHandler from '../helpers/dbErrorHandler'

const create = async (req, res) => {
    const user = new User (req.body);
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
const list = async (req, res) => {
    try {
        let users = await User.find().select("name email updated created");
        res.json(users);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const userById = async (req, res, next, id) => {
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

const update = async (req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save();
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        res.json(deletedUser)
    } catch (err) {
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