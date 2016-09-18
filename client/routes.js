import Posts from './containers/posts';
import Post from './containers/post';

export default function (injectDeps, { configs }) {
  const routes = {
    '/admin': ['posts'],

    // insert routes for other layouts here

    '/': [
      {path: 'posts', component: Posts},
      {path: 'post/:id', component: Post}
    ]
  };

  return routes;
}
