db.dropDatabase();

for (var i = 1; i <= 30; i++) {
  db.blogs.insert({
    title: 'Blog title ' + i,
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    text: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dignissim elit et mi ultricies bibendum. Nam justo erat, consequat et sem quis, sodales faucibus odio. In rutrum turpis nec porta vestibulum. Pellentesque cursus eros sit amet suscipit dictum. Curabitur sodales ullamcorper orci, a vehicula urna lobortis ut. Nunc congue, enim vitae pretium pretium, tellus enim efficitur nulla, id mollis nunc felis vitae augue. Nullam posuere tortor at mi tempor, at convallis nisl euismod. Aenean tristique luctus dui, vel dapibus turpis.',
      'Aliquam erat volutpat. Morbi commodo tortor eget sem scelerisque consectetur. Nunc nec congue nulla. Cras sed urna vel purus malesuada mattis nec non ligula.'
    ]
  });
}

db.users.insert({
  username: 'admin',
  password: 'Password1'
});


