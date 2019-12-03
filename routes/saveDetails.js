const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const dotEnv = require('dotenv').config();

const dburl = process.env.URL;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/saveDetails',(req,res) => {

      var data = {

         id:req.body.id,
         name:req.body.fullname,
         mobile:req.body.mobile,
         date:req.body.date
       };

   MongoClient.connect(dburl,{ useNewUrlParser: true,useUnifiedTopology:true},(err,client) => {

              if(err){
                  console.log("Error",err);
              }
              else{
                  
                let collection = client.db('Easypolicy_db').collection('Policies');

                collection.insertOne(data,(err,resp) => {
                          
                    if(err){
                        console.log("Db Error",err);
                    }
                    else{

                        res.send("Data added successfully");
                        client.close();
                    }
                });
              }
   });
});

module.exports = router;

