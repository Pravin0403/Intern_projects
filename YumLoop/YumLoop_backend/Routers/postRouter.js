import express from 'express';
import * as postController from '../controllers/postController.js';
import { jwtAuth } from '../middleware/auth.js';
import { uploadImage } from '../middleware/multer.js';
import { Post } from '../Models/Post.js';
const router = express.Router();

router.post('/', jwtAuth, uploadImage.single('images'), postController.createPost);
router.get('/test', jwtAuth, (req, res) => {
  res.json({ message: 'Post router is working', user: req.user.id });
});
router.get('/feed', jwtAuth, postController.getFeed);
router.get('/user-posts', jwtAuth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/user/:id', jwtAuth, postController.getPostsByUser);
router.put('/like/:id', jwtAuth, postController.likePost);
router.post('/comment/:id', jwtAuth, postController.commentPost);
router.put('/edit/:id', jwtAuth, postController.editPost);
router.delete('/:id', jwtAuth, postController.deletePost);
router.post('/report/:id', jwtAuth, postController.reportPost);

export default router; 