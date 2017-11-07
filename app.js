/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , ConvProvider = require('./ConvProvider').ConvProvider
  , fs = require('fs')
  , user_ = [];

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  //app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  //app.set('view options', {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var convProvider= new ConvProvider('localhost', 27017);

//Routes
//index, usará cemp
/*app.get('/', function(req, res){
      res.render('index', {
            title: 'CEMPASÚCHIL',
        });
});*/

app.use(express.static(__dirname + '/public'));

app.get('/manual', function(req,res){ 
    res.download('./cemp.pdf');
    
});

app.get('/n*',function(req, res){
    var str = "";
    var str2 = "";
        user_[0] = req.param('age');
        user_[1] = req.param('gender');
        user_[2] = req.param('osexual');
        user_[3] = req.param('bPlace');
        user_[4] = req.param('lPlace');
        user_[5] = req.param('lang');
        user_[6] = req.param('edu');
        user_[7] = req.param('major');
        user_[8] = req.param('ocup');
        user_[9] = req.param('rel');
        //user_[10] = req.param('rel');
    
        convProvider.findAll(user_, function(error, emps){
        for(i=0; i< emps.length; i++){
            str = str + emps[i].user1.lines
        }
    });
    
    convProvider.findAll2(user_, function(error, emps){
        for(i=0; i< emps.length; i++){
            str2 = str2 + emps[i].user2.lines 
        }
            res.json(str + str2);
            //res.send(emps);
    });
});
app.listen(process.env.PORT || 3000);
