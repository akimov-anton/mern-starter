import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './PostCommentCreate.css';
import { injectIntl, FormattedMessage, intlShape } from 'react-intl';

export class PostCommentCreate extends Component {
  state = {
    authorName: '',
    content: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.comment) {
      this.setState({
        authorName: nextProps.comment.author,
        content: nextProps.comment.content,
      });
    }
  }

  addComment = (e) => {
    e.preventDefault();
    if (typeof this.state.authorName !== 'undefined' && typeof this.state.content !== 'undefined') {
      const comment = {
        author: this.state.authorName,
        content: this.state.content,
        cuid: this.props.comment ? this.props.comment.cuid : null,
      };
      this.props.onAddComment(comment);
      this.setState({
        authorName: '',
        content: '',
      });
    }
  };

  render() {
    return (
      <div>
        <div className={styles['form-content']}>
          <div>
            <h2 className={styles['form-title']}><FormattedMessage id="createNewComment" /></h2>
            <input
              placeholder={this.props.intl.messages.authorName}
              className={styles['form-field']}
              value={this.state.authorName}
              onChange={(e) => this.setState({ authorName: e.target.value })}
            />
            <textarea
              placeholder={this.props.intl.messages.commentContent}
              className={styles['form-field']}
              value={this.state.content}
              onChange={(e) => this.setState({ content: e.target.value })}
            />
          </div>
          <a className={styles['post-submit-button']} href="#" onClick={this.addComment}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

PostCommentCreate.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  }),
  onAddComment: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(PostCommentCreate);

