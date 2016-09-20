export default (context) => {
  const { Meteor, Collections } = context;
  const { Posts, Packages } = Collections;
  Meteor.methods({
    'posts.get'() {
      return Posts.find().fetch();
    },
    'posts.get.single'(id) {
      const post = Posts.findOne(id);
      if (!post) {
        throw new Meteor.Error('404', 'not found');
      }
      return post;
    },
    'posts.add'(category, coverUrl, title, content) {
      Posts.insert({
        category,
        coverUrl,
        title,
        content
      });
    },
    'posts.delete'(id) {
      Posts.remove(id);
    },
    'posts.categories.add'(category) {
      Packages.update({ name: 'posts' }, {
        $push: {
          'configs.categories': category
        }
      })
    },
    'posts.categories.delete'(category) {
      Packages.update({ name: 'posts' }, {
        $pull: {
          'configs.categories': category
        }
      });
      Posts.update({ category }, {
        $set: { category: '' }
      });
    },
    'posts.categories.position'(category) {
      Packages.update({ name: 'posts' }, {
        $set: { 'configs.UI.categoriesPosition': category }
      })
    },
    'posts.categories.color'(color) {
      Packages.update({ name: 'posts' }, {
        $set: { 'configs.UI.categoriesTabsColor': color }
      })
    }
  });
};
