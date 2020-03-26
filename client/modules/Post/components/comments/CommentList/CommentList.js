import React from 'react';
import PropTypes from 'prop-types';
import styles from './CommentList.css';

// Import Components
import { PostComment } from '../PostComment/PostComment';

function CommentList(props) {
  return (
    <div className={styles.list}>
      {
        props.comments.map(comment => (
          <PostComment
            author={comment.author}
            content={comment.content}
            dateAdded={comment.dateAdded}
            key={comment.cuid}
            onUpdateClick={() => props.handleUpdateComment(comment)}
            onDeleteClick={() => props.handleDeleteComment(comment)}
          />
        ))
      }
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  })).isRequired,
  handleUpdateComment: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
};

export default CommentList;
