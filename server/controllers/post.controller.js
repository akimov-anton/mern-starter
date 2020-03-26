import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Save a comment
 * @param req
 * @param res
 * @returns void
 */

export function addComment(req, res) {
  if (!req.body.postId || !req.body.comment.content || !req.body.comment.author) {
    res.status(403).end();
  }
  const newComment = {
    author: sanitizeHtml(req.body.comment.author),
    content: sanitizeHtml(req.body.comment.content),
    cuid: cuid(),
  };

  Post.findOneAndUpdate(
    { cuid: req.body.postId },
    { $push: { comments: newComment } },
    { new: true }, (err, saved) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ post: saved, comment: saved.comments[saved.comments.length - 1] });
      }
    });
}

/**
 * Update a comment
 * @param req
 * @param res
 * @returns void
 */

export function updateComment(req, res) {
  if (!req.body.postId || !req.body.comment.content) {
    res.status(403).end();
  }

  Post.findOneAndUpdate(
    { cuid: req.body.postId, 'comments.cuid': req.body.comment.cuid },
    { $set: {
      'comments.$.content': sanitizeHtml(req.body.comment.content),
      'comments.$.author': sanitizeHtml(req.body.comment.author),
      'comments.$.dateUpdated': Date.now() } },
    { new: true }, (err, saved) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ post: saved });
      }
    });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}

/**
 * Delete a comment
 * @param req
 * @param res
 * @returns void
 */

export function deleteComment(req, res) {
  Post.findOneAndUpdate(
    { cuid: req.body.postId, 'comments.cuid': req.body.commentId },
    { $pull: { comments: { cuid: req.body.commentId } } },
    { new: true }, (err, saved) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ post: saved });
      }
    });
}
