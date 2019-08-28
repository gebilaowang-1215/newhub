var mongodb = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';
function connectDB(callback){
    // 客户端链接mongodb
    mongodb.connect(url,(err,mongo)=>{//mongo=>MongoClient
        // 创建数据库
        var dbName = mongo.db('adminuser');
        if(err){
            callback(err,null);
        }
        callback(err,mongo,dbName);
    });
}
exports.add = function(collectionName,json,callback){
    connectDB(function(err,mongo,dbName){
        dbName.collection(collectionName).insert(json,function(err,result){
            if(err){
                callback(err,result);
            }
            callback(err,result)
            mongo.close();
        })
    })
}
exports.find = function(collectionName,json,callback){
    connectDB(function(err,mongo,dbName){
        dbName.collection(collectionName).find(json).toArray(function(err,result){
            if(err){
                callback(err,result);
            }
            callback(err,result)
            mongo.close();
        })
    })
}
exports.del = function(collectionName,json,callback){
    connectDB(function(err,mongo,dbName){
        dbName.collection(collectionName).deleteOne(json,function(err,result){
            if(err){
                callback(err,result);
            }
            callback(err,result)
            mongo.close();
        })
    })
}
exports.update = function(collectionName,json,json1,callback){
    connectDB(function(err,mongo,dbName){
        dbName.collection(collectionName).updateOne(json,{$set:json1},function(err,result){
            if(err){
                callback(err,result);
            }
            callback(err,result)
            mongo.close();
        })
    })
}