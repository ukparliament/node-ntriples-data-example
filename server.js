'use strict';

const express = require('express');
const requestFile = require('./assets/javascripts/requestFile');
const toJSON = require('./assets/javascripts/toJSON');
const port = process.env.PORT || 8080;

let App = express();

/**
 * REST API
 */

App.get('/mps', (req, res) => {
  requestFile(
    'https://api.parliament.uk/Live/fixed-query/person_mps',
    data => {
      res.setHeader('Content-Type', 'application/json');
      res.send(toJSON(data));
    }
  );
});

/**
 * VIEWS
 */

App.use(express.static('./assets'));
App.set('views', './views');
App.set('view engine', 'ejs');

App.get('/', (req, res) => {
  res.render('index', {
    page_title: 'MPs by Party'
  });
});

App.listen(port, function() {
  console.log('Listening on port ' + port);
});
