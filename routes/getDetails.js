const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dotEnv = require('dotenv').config();

const dburl = process.env.URL;

router.get('/getDetails',(req,res) => {

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {

                 if(err){
                     console.log("Error",err);
                 }
                 else{

                    let collection = client.db('Easypolicy_db').collection('Policies');

                    collection.find({},{id:0,_id:0}).toArray((err,result) => {

                        if(err){
                            console.log('Error',err);
                        }
                        else{

                            let output = result.map(r => ({'fullname':r.name
                        ,'mobile':r.mobile,'date':r.date}));

                        res.send(output);
                        client.close();  
                        }
                        
                    });
                 }
    });
});

module.exports = router;