var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

var a,b,c,d,e,f,g,h,i,j,k = "";

ConvProvider = function(host, port) {
  this.db= new Db('PRUEBA_1', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
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
                            query["user1.osexual"]= info[i];
                            break;
                        case 3:
                            query["user1.birthPlace"]= info[i];
                            break;
                        case 4:
                            query["user1.livePlace"]= info[i];
                            break;
                        case 5:
                            query["user1.languages"]= info[i];
                            break;
                        case  6:
                            query["user1.education"]= info[i];
                           break;
                           case 7:
                            query["user1.major"]= info[i];
                            break;
                        case 8:
                            query["user1.ocupation"]= info[i];
                            break;
                        case 9:
                            query["user1.relation"]= info[i];
                            break;
                         case 10:
                            query["user1.faculty"]= info[i];
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
                            query["user2.osexual"]= info[i];
                            break;
                        case 3:
                            query["user2.birthPlace"]= info[i];
                            break;
                        case 4:
                            query["user2.livePlace"]= info[i];
                            break;
                        case 5:
                            query["user2.languages"]= info[i];
                            break;
                        case  6:
                            query["user2.education"]= info[i];
                           break;
                           case 7:
                            query["user2.major"]= info[i];
                            break;
                        case 8:
                            query["user2.ocupation"]= info[i];
                            break;
                        case 9:
                            query["user2.relation"]= info[i];
                            break;
                        case 10:
                            query["user2.faculty"]= info[i];
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