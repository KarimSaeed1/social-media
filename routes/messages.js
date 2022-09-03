import express from 'express';

import {newMessage,getMessage} from '../controllers/messsage.js';

import {auth} from '../middlewares/auth.js';

const router = express.Router();


router.post('/:convId',auth,newMessage);
router.get('/:convId',auth,getMessage);

export default router ;