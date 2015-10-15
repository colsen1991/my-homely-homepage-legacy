function notFoundHandler(req, res) {
  res.sendStatus(404);
}

function errorHandler(error, req, res) {
  console.error(error);
  res.sendStatus(500);
  if (req.xhr)
    res.send({error: 'A thing happened...'});
  else
    res.sendFile(__dirname + '/error.html');
}

exports.notFoundHandler = notFoundHandler;
exports.errorHandler = errorHandler;
