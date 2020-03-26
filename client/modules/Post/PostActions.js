import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addComment(post, comment) {
  return {
    type: ADD_COMMENT,
    postId: post.cuid,
    comment,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    }).then(res => dispatch(addPost(res.post)));
  };
}

export function addCommentRequest(post, comment) {
  return (dispatch) => {
    return callApi('postsComments', 'post', {
      postId: post.cuid,
      comment,
    }).then(res => dispatch(addComment(post, res.comment)));
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function updateComment(post, comment) {
  return {
    type: UPDATE_COMMENT,
    postId: post.cuid,
    commentId: comment.cuid,
    content: comment.content,
  };
}

export function updateCommentRequest(post, comment) {
  return (dispatch) => {
    return callApi('postsComments', 'put', {
      postId: post.cuid,
      comment,
    }).then(res => dispatch(updateComment(res.post, comment)));
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deleteComment(post, commentId) {
  return {
    type: DELETE_COMMENT,
    postId: post.cuid,
    commentId,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}

export function deleteCommentRequest(post, comment) {
  return (dispatch) => {
    return callApi('postsComments', 'delete', {
      postId: post.cuid,
      commentId: comment.cuid,
    }).then(() => dispatch(deleteComment(post, comment.cuid)));
  };
}
