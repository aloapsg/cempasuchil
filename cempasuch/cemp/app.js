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
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
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
app.get('/', function(req, res){
    var M = 0;
    var H = 0;
    convProvider.findAll3("M",function(error, emps){
        M = emps.length;
        convProvider.findAll4("M",function(error, emps){
            M = M + emps.length;
            convProvider.findAll3("H",function(error, emps){
                H = emps.length;
                convProvider.findAll4("H",function(error, emps){
                    H = H + emps.length;
                    res.render('index2s', {
                        title: 'CEMPASÚCHIL',
                        mujeres: M,
                        hombres: H
                    });
                });
            });
        });
    });
});

app.use(express.static(__dirname + '/public'));

app.get('/manual', function(req,res){ 
    res.download('./cemp.pdf');
    
});

app.get('/n*',function(req, res){
    var str = "";
    var str2 = "";
    var emps1 = [];
    var emps2 = [];
    var texts = [];
    var num_m = 0;
    var num_h = 0;
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
        user_[10] = req.param('fac');
        //user_[10] = req.param('rel');

    convProvider.findAll(user_, function(error, emps){
            str = str + emps[0].conversacion
            str = str.substr(0,400);
            var posC = str.indexOf("USER",0);
            var col = str.slice(posC - 15);
            str= str.replace(/(([0-9]|[0-9][0-9])[/])/g,"*-^] ");
            texts = str.split("*-^]");
            emps1 = emps;
            for(i=0;i< emps1.length;i++){
                if(emps1[i].user1.gender == "M"){
                    num_m++;
                }else{
                    if(emps1[i].user1.gender == "H"){
                    num_h++;
                    }
                }
            }
            convProvider.findAll2(user_, function(error, emps){
                emps2 = emps;
                for(i=0;i< emps2.length;i++){
                if(emps2[i].user2.gender == "M"){
                    num_m++;
                }else{
                    if(emps2[i].user2.gender == "H"){
                    num_h++;
                    }
                }
            }
                //res.json(str + str2);
                res.render('resultados', {
                    title: 'Resultados',
                    result1: emps1,
                    result2: emps2,
                    nums: emps1.length + emps2.length,
                    text: texts,
                    num_m: num_m,
                    num_h: num_h
                });
                //res.send(emps);
            });
    });
});

app.get('/vista', function(req,res){ 
                res.render('employee_edit', {
                    title: 'Muestra de corpus de mensajería instantánea',
                    result: 2
                }); 
                //res.send(emps);                      
});

app.listen(process.env.PORT || 3000);
