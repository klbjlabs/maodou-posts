import { useDeps } from 'react-simple-di';
import { compose, withHandlers, withLifecycle, withTracker, withRedux, composeAll } from 'react-komposer-plus';
import { browserHistory } from 'react-router'

import Post from '../components/post';

const lifecycle=({
  componentWillReceiveProps(nextProps) {
    if (nextProps.post) {
      document.title = nextProps.post.title;
    }
  }
});

const initData = ({ context, params }, onData) => {
  const { Meteor, swal } = context;
  const postId = params.id;
  Meteor.call('posts.get.single', postId, (err, post) => {
    if (err) {
      if (err.error === '404'){
        swal({
          title: "Post Not Found",
          text: "Jumping to post list",
          type: "error"
        });
        browserHistory.push('/posts');
      }
    } else {
      onData(null, { post });
    }
  });
  onData(null, {});
};

const depsToProps = (context, actions) => ({
  context
});

export default composeAll(
  withLifecycle(lifecycle),
  compose(initData),
  useDeps(depsToProps)
)(Post);
