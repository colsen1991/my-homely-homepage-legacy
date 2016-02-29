db.dropDatabase();

for (var i = 1; i <= 30; i++) {
  db.blogs.insert({
    title: 'This is blog title #' + i,
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae justo eget odio volutpat posuere. Nam ut metus pulvinar, aliquet nisl non, consectetur lorem. Maecenas vel quam ac felis efficitur dapibus. Nunc dictum commodo magna eget consequat amet...',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae justo eget odio volutpat posuere. Nam ut metus pulvinar, aliquet nisl non, consectetur lorem. Maecenas vel quam ac felis efficitur dapibus. Nunc dictum commodo magna eget consequat amet.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae justo eget odio volutpat posuere. Nam ut metus pulvinar, aliquet nisl non, consectetur lorem. Maecenas vel quam ac felis efficitur dapibus. Nunc dictum commodo magna eget consequat amet.'
  });
}

db.users.insert({
  username: 'admin',
  password: 'Password1'
});


