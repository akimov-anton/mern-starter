import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { addCommentRequest, updateCommentRequest, deleteCommentRequest, fetchPost } from '../../PostActions';

// Import Selectors
import { getPost } from '../../PostReducer';

// Import components
import PostCommentCreate from '../../components/comments/PostCommentCreate/PostCommentCreate';
import PostCommentList from '../../components/comments/CommentList/CommentList';

export class PostDetailPage extends Component {
  state = {
    currentComment: null,
  };

  handleUpdateCommentClick = (comment) => {
    this.setState({ currentComment: comment });
    window.scrollTo(0, document.body.scrollHeight);
  };

  handleAddComment = (comment) => {
    if (this.state.currentComment) {
      this.props.dispatch(updateCommentRequest(this.props.post, comment));
    } else {
      this.props.dispatch(addCommentRequest(this.props.post, comment));
    }
    this.setState({ currentComment: null });
  };

  handleDeleteComment = (comment) => {
    // eslint-disable-next-line no-alert
    if (confirm('Do you want to delete this comment')) {
      this.props.dispatch(deleteCommentRequest(this.props.post, comment));
    }
  };

  render() {
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{this.props.post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
          <p className={styles['post-desc']}>{this.props.post.content}</p>
          <PostCommentList
            comments={this.props.post.comments}
            handleUpdateComment={this.handleUpdateCommentClick}
            handleDeleteComment={this.handleDeleteComment}
          />
          <PostCommentCreate comment={this.state.currentComment} onAddComment={this.handleAddComment} />
        </div>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    comments: PropTypes.array,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
