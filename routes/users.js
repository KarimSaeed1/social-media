import express from 'express';

import {getAllUsers,getUser,follow,unfollow} from '../controllers/user.js';
import {register,login} from '../controllers/auth.js';
import {auth,isAdmin} from '../middlewares/auth.js'
const router = express.Router();

router.get('/all',getAllUsers);
router.get('/:id',getUser)
router.post('/register',register)
router.post('/login',login)
router.put('/:id/follow',auth,follow)
router.put('/:id/unfollow',auth,unfollow)

export default router ;