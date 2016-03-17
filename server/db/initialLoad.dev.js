db.dropDatabase();

for (var i = 1; i <= 10; i++) {
  db.blogs.insert({
    id: 'this-is-a-blog-post-title-' + i,
    headerImageLink: 'https://i.imgur.com/GsGu8l2.jpg',
    title: 'This is blog-post title #' + i,
    date: new Date().toString(),
    author: 'Christer Olsen',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae justo eget odio volutpat posuere. Nam ut metus pulvinar, aliquet nisl non, consectetur lorem. Maecenas vel quam ac felis efficitur dapibus. Nunc dictum commodo magna eget consequat amet...',
    text: '# Perque haud turbatum\n\n## Veniam cognoscere palato somnus intacta et lacrimas\n\nLorem *markdownum stetit* reddebant interserit umquam o quoque gavisus tempore estote deceptus spolioque audito; rogat ante! Visa hoc: abiere rerum guttae, hinc tecto sub pateris Nilus. Carior regia, oneris; Vix preces tristisque, est modo non faciem, pascas, ore. Morique vastius adparuit.\n\n## Morbis tactusque pia est placidam astra ne\n\nIras materiaque, dea angues olim tremens et insignis iuvenes fratres, meo inque quos cuspide; ferae humum columbas. Occasus saecula prospiciunt. Contraria curras **sub plenos**, medicas vulnusque ignis, est ista quid dira pennis Iunone. Et puer et: crescit rubescunt fallere **Phinea coegi**!\n\n - Et viri suis\n - Corvo dentibus saucia exclamat illud non sed\n - Tibi eris truncum perterrita ingrediens credens tremulae\n - Durum retro Musa sciat\n - Vocat contemnere relatu sedit creator\n - Que est Troia ante hoste coegerat\n\n![alt text](https://i.imgur.com/Br422Kb.png "Logo Title Text 1")',
    published: i % 2 === 0
  });
}

db.users.insert({
  username: 'a',
  password: 'a',
  name: 'Christer Olsen'
});


