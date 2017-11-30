var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var a,b,c,d,e,f,g,h,i,j,k = "";

ConvProvider = function(host, port) {
  this.db= new Db('PRUEBA_2', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


ConvProvider.prototype.getCollection= function(callback) {
  this.db.collection('conver', function(error, c_collection) {
    if( error ) callback(error);
    else callback(null, c_collection);
  });
};

//find all employees
ConvProvider.prototype.findAll = function(info, callback) {
    this.getCollection(function(error, c_collection) {
      if( error ) callback(error)
      else {
        var query = {};
          for(i=0; i<11; i++){
              if(info[i] != "selecciona"){
                  if(info[i] != ""){
                   switch(i) {
                        case 0:
                            query["user1.age"]= info[i];
                            break;
                        case 1:
                            query["user1.gender"]= info[i];
                            break;
                        case 2:
                            query["user1.oSexual"]= info[i];
                            break;
                        case 3:
                            query["user1.bPlace"]= info[i];
                            break;
                        case 4:
                            query["user1.lPlace"]= info[i];
                            break;
                        case 5:
                            query["user1.lang"]= info[i];
                            break;
                        case  6:
                            query["user1.edu"]= info[i];
                           break;
                           case 7:
                            query["user1.major"]= info[i];
                            break;
                        case 8:
                            query["user1.ocup"]= info[i];
                            break;
                        case 9:
                            query["relation"]= info[i];
                            break;
                         case 10:
                            query["user1.fac"]= info[i];
                            break;
                    }
              }
              }
          }
          if(Object.keys(query) != ""){
          c_collection.find(query).toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
        }
      }
    });
};


ConvProvider.prototype.findAll2 = function(info, callback) {
    this.getCollection(function(error, c_collection) {
      if( error ) callback(error)
      else {
        var query = {};
          for(i=0; i<11; i++){
              if(info[i] != "selecciona"){
                  if(info[i] != ""){
                   switch(i) {
                        case 0:
                            query["user2.age"]= info[i];
                            break;
                        case 1:
                            query["user2.gender"]= info[i];
                            break;
                        case 2:
                            query["user2.oSexual"]= info[i];
                            break;
                        case 3:
                            query["user2.bPlace"]= info[i];
                            break;
                        case 4:
                            query["user2.lPlace"]= info[i];
                            break;
                        case 5:
                            query["user2.lang"]= info[i];
                            break;
                        case  6:
                            query["user2.edu"]= info[i];
                           break;
                           case 7:
                            query["user2.major"]= info[i];
                            break;
                        case 8:
                            query["user2.ocup"]= info[i];
                            break;
                        case 9:
                            query["relation"]= info[i];
                            break;
                        case 10:
                            query["user2.fac"]= info[i];
                            break;
                    }
              }
              }
          }
        if(Object.keys(query) != ""){
          c_collection.find(query).toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
        }
      }
    });
};

ConvProvider.prototype.findAll3 = function(Sexo, callback) {
    this.getCollection(function(error, c_collection) {
      if( error ) callback(error)
      else{
          c_collection.find( { "user1.gender":Sexo } ).toArray(function(error, results){
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

ConvProvider.prototype.findAll4 = function(Sexo, callback) {
    this.getCollection(function(error, c_collection) {
      if( error ) callback(error)
      else{
          c_collection.find( { "user2.gender":Sexo } ).toArray(function(error, results){
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};




exports.ConvProvider = ConvProvider;