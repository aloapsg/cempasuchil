/**
 * Module dependencies.
 */

var express = require('express')
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
    var text_muestra = {};
        user_[0] = req.param('age');
        user_[1] = req.param('gender');
        user_[2] = req.param('osexual');
        user_[3]  = req.param('bPlace');
        user_[4] = req.param('lPlace');
        user_[5] = req.param('lang');
        user_[6] = req.param('edu');
        user_[7] = req.param('major');
        user_[8] = req.param('ocup');
        user_[9] = req.param('rel');
        user_[10] = req.param('fac');
        //user_[10] = req.param('rel');

    convProvider.findAll(user_, function(error, emps){
        str = str + emps[0].conv
        str = str.substr(0,400);
        str= str.replace(/(([0-9]|[0-9][0-9])[/|-])/g,"*-^] ");
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
                for(i=0;i<texts.length;i++){
                    if(texts[i].indexOf(emps1[0].user1.user) != -1){
                       text_muestra[texts[i]] = "1";
                    }else{
                       if(texts[i].indexOf(emps1[0].user2.user) != -1){
                            text_muestra[texts[i]] = "2";
                        }else{
                            text_muestra[texts[i]] = "0";
                        }
                    }
                }
                //res.json(str + str2);
                res.render('resultados', {
                    title: 'Resultados',
                    result1: emps1,
                    result2: emps2,
                    nums: emps1.length + emps2.length,
                    text_d: text_muestra,
                    text: texts,
                    num_m: num_m,
                    num_h: num_h
                });
                //res.send(emps);
            });
    });
});

app.get('/vista', function(req,res){ 
                res.render('particip', {
                    title: 'Muestra de corpus de mensajería instantánea',
                    result: 2
                }); 
                //res.send(emps);                      
});

app.get('/googlemapp', function(req,res){ 
                res.render('googlemap', {
                    ulur: [{lat: -31.563910, lng: 147.154312},
        {lat: -33.718234, lng: 150.363181},
        {lat: -33.727111, lng: 150.371124},
        {lat: -33.848588, lng: 151.209834},
        {lat: -33.851702, lng: 151.216968},
        {lat: -34.671264, lng: 150.863657},
        {lat: -35.304724, lng: 148.662905},
        {lat: -36.817685, lng: 175.699196},
        {lat: -36.828611, lng: 175.790222},
        {lat: -37.750000, lng: 145.116667},
        {lat: -37.759859, lng: 145.128708},
        {lat: -37.765015, lng: 145.133858},
        {lat: -37.770104, lng: 145.143299},
        {lat: -37.773700, lng: 145.145187}],
                    pageTitle: "ok",
                    max: 11
                });
                //res.send(emps);                      
});

app.listen(process.env.PORT || 3000);