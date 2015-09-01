'use strict';

var consumer = require('./consumer');

var router = {
  setup: function (app) {
    app.get('/', consumer.doGetRoot);
    app.get('/comments', consumer.doGetComments);
    app.post('/comments', consumer.doPostComments);
  }
};

module.exports = router;
