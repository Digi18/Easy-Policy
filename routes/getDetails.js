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

                    let collection = client.db('Tiffino_db').collection('Messages');

                    collection.find({}).toArray((err,result) => {

                        let output = result.map(r => ({'fullname':r.name
                        ,'mobile':r.mobile,'date':r.date}));

                        res.send(output);
                        client.close();  
                    });
                 }
    });
});

module.exports = router;