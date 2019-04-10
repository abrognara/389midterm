var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var app = express();
var path = require('path');
var coasterDataUtil = require('./coaster-data-util');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

var _DATA = coasterDataUtil.loadData().coasters;

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
*/

app.get('/',function(req, res) {
  res.render('home',{list: _DATA});
})

app.get('/add', function(req, res) {
  res.render('add-coaster',{});

  app.post('/add', function(req, res) {
    var body = req.body;
    var user = req.body.rname;
    if (user == '') { user = 'Anonymous'; }

    var newCoaster = {
      'name': body.name,
      'opened': body.year,
      'height': body.height,
      'maxspeed': body.speed,
      'inversions': body.inversions,
      'duration': body.duration,
      'length': body.length,
      'capacity': body.capacity,
      'manufac': body.manufac,
      'reviews': [{[user]: body.review}]
    };
    _DATA.push(newCoaster);
    coasterDataUtil.saveData(_DATA);
    res.redirect('/');
  });
});

app.get('/api/get-all', function(req, res){
  res.json(_DATA);
});

app.post('/api/add-coaster/:name/:opened/:height/:maxspeed/:inversions/:duration/:length/:capacity/:manufac',
function(req, res) {
  var params = req.params;

  var newCoaster = {
    'name': params.name,
    'opened': params.opened,
    'height': params.height,
    'maxspeed': params.maxspeed,
    'inversions': params.inversions,
    'duration': params.duration,
    'length': params.length,
    'capacity': params.capacity,
    'manufac': params.manufac,
    'reviews': []
  };
  _DATA.push(newCoaster);
  coasterDataUtil.saveData(_DATA);
  res.json(newCoaster);
});

app.get('/add-review/:name', function(req, res){
  var found = '';

  for (coaster of _DATA) {
    if (coaster.name === req.params.name) {
      found = coaster.name;
    }
  }

  if (found === '') { res.render('add-review', {exists: false, coaster: ''}) 
  } else {
    res.render('add-review', {exists: true, coaster: found});
  }

  app.post('/add-review/:name', function(req, res){
    var review = req.body.review;
    var user = req.body.rname;
    if (user == '') { user = 'Anonymous'; }

    var reviewedCoaster = {}
    for (coaster of _DATA) {
      if (coaster.name === found) {
        reviewedCoaster = coaster;
      }
    }
    reviewedCoaster.reviews.push({[user]: review});
    coasterDataUtil.saveData(_DATA);
    res.redirect('/');
  });
});

app.get('/list', function(req, res) {
  var names = [];
  for (coaster of _DATA) {
    names.push(coaster.name);
  }
  names.sort();
  res.render('list', {cNames: names});
});

app.get('/height', function(req, res) {
  var heights = [];
  for (coaster of _DATA) {
    heights.push(coaster.height);
  }
  heights.sort().reverse();
  var names = []

  for (i in heights) {
    for (coaster of _DATA) {
      if (coaster.height === heights[i]) {
        names.push(coaster.name)
      }
    }
  }

  res.render('height', {cHeights: heights, cNames: names});
});

app.get('/speed', function(req, res) {
  var speeds = [];
  for (coaster of _DATA) {
    speeds.push(coaster.maxspeed);
  }
  speeds.sort().reverse();
  var names = []

  for (i in speeds) {
    for (coaster of _DATA) {
      if (coaster.maxspeed === speeds[i]) {
        names.push(coaster.name)
      }
    }
  }

  res.render('speed', {cSpeeds: speeds, cNames: names});
});

app.get('/age', function(req, res) {
  var ages = [];
  for (coaster of _DATA) {
    ages.push(coaster.opened);
  }
  ages.sort().reverse();
  var names = []

  for (i in ages) {
    for (coaster of _DATA) {
      if (coaster.opened === ages[i]) {
        names.push(coaster.name)
      }
    }
  }

  res.render('age', {cAges: ages, cNames: names});
});

app.get('/manufacturers', function(req, res) {
  var names = [];
  for (coaster of _DATA) {
    if (!names.includes(coaster.manufac)) {
      names.push(coaster.manufac)
    }
  }
  names.sort();

  res.render('manufacturers', {manufacturers: names});
});

/**
 * Reset function used for development & debugging
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */
app.get('/reset', function(req, res) {
  res.render('cleared',{});

  app.post('/reset/reviews', function(req, res){
    for (coaster of _DATA) {
      coaster.reviews = []
    }
    coasterDataUtil.saveData(_DATA)
    _DATA = coasterDataUtil.loadData().coasters;
    res.redirect('/');
  });

  app.post('/reset/all', function(req, res){
    coasterDataUtil.resetData();
    _DATA = coasterDataUtil.loadData().coasters;
    res.redirect('/');
  });
});
/**
 *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening!');
});
