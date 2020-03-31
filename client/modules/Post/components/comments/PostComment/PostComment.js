import React from 'react';
import PropTypes from 'prop-types';
import styles from './PostComment.css';
import { FormattedMessage } from 'react-intl';

export function PostComment(props) {
  const handleUpdate = (e) => {
    e.preventDefault();
    props.onUpdateClick();
  };
  const handleDelete = (e) => {
    e.preventDefault();
    props.onDeleteClick();
  };
  const commentDate = new Date(props.dateAdded);
  return (
    <div className={styles.wrap}>
      <div className={styles.author}>
        <span><FormattedMessage id="by" /></span> {props.author}
      </div>
      <span className={styles.time}>
          {commentDate.toLocaleTimeString()} {commentDate.toLocaleDateString()}
      </span>
      <div className={styles.content}>
        {props.content}
      </div>
      <div className={styles.tools}>
        <a className={styles.link} href="#" onClick={handleUpdate}>Update</a>
        <a className={styles.link} href="#" onClick={handleDelete}>Delete</a>
      </div>
    </div>
  );
}

PostComment.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  dateAdded: PropTypes.string.isRequired,
  onUpdateClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};
