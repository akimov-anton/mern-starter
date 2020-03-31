import { ADD_POST, ADD_POSTS, ADD_COMMENT, DELETE_POST, UPDATE_COMMENT, DELETE_COMMENT } from './PostActions';

// Initial State
const initialState = { data: [] };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST :
      return {
        data: [action.post, ...state.data],
      };

    case ADD_POSTS :
      return {
        data: action.posts,
      };

    case ADD_COMMENT :
      return {
        data: state.data.map(post => (post.cuid === action.postId ? {
          ...post,
          comments: [...post.comments, action.comment],
        } : post)),
      };

    case UPDATE_COMMENT :
      return {
        data: state.data.map(post => (post.cuid === action.postId ? {
          ...post,
          comments: post.comments.map(comment => (
            comment.cuid === action.commentId
              ? {
                ...comment,
                author: action.author,
                content: action.content,
              }
              : comment
          )),
        } : post)),
      };

    case DELETE_COMMENT :
      return {
        data: state.data.map(post => (post.cuid === action.postId ? {
          ...post,
          comments: post.comments.filter(comment => comment.cuid !== action.commentId),
        } : post)),
      };

    case DELETE_POST :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Export Reducer
export default PostReducer;
