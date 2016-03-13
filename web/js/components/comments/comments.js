import React from 'react';
import { connect } from 'react-redux';
import ReactDisqusThread from 'react-disqus-thread';
import { showComments as showCommentsAction } from '../../actions';
import styles from './comments.styl';

export const Comments = ({ showComments, doShowComments, ...disqusProps }) => {
  if (showComments) return <ReactDisqusThread {...disqusProps}/>;

  return <button className={styles.showCommentsButton} onClick={doShowComments}>Show comments</button>;
};

export function mapStateToProps({ blog: { showComments } }) {
  return { showComments };
}

export default connect(mapStateToProps, { doShowComments: showCommentsAction })(Comments);
