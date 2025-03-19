import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/api/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/api/users/:userId')
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove)
    
    router.route('/api/v2/users/:userId')
        .get(authCtrl.requiresSignin, userCtrl.read)
        .put(authCtrl.requiresSignin, authCtrl.hasAuthorization, userCtrl.update)
        .delete(authCtrl.requiresSignin, authCtrl.hasAuthorization, userCtrl.remove)
        
router.param('userId', userCtrl.userById);

export default router;