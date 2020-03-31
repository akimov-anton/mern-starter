import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
const router = new Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Add comment to Post
router.route('/postsComments').post(PostController.addComment);

// Update post comment
router.route('/postsComments').put(PostController.updateComment);

// Delete post comment
router.route('/postsComments').delete(PostController.deleteComment);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

export default router;
