import express from 'express';

import {addPost,updatePost,deletePost,getPost,likePost,getAllPosts,getTimelinePosts} from '../controllers/post.js';

import {auth} from '../middlewares/auth.js';

const router = express.Router();


router.post('/',auth,addPost);
router.put('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.get('/:id',auth,getPost)
router.get('/',auth,getAllPosts)
router.put('/like/:id',auth,likePost)
router.get('/timeline',auth,getTimelinePosts)

export default router ;