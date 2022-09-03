import express from 'express';

import {newConversation , getConversations} from '../controllers/conversation.js';

import {auth} from '../middlewares/auth.js';

const router = express.Router();


router.post('/',newConversation)
router.get('/',auth,getConversations)

export default router ;