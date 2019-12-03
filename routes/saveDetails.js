const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const dburl = process.env.URL;

router.post('/saveDetails',(req,res) => {

      var data = {

        // id:req.body.id,
         name:req.body.fullname,
         mobile:req.body.mobile,
         date:req.body.date
       };

    MongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client) => {
                 
                   if(err){
                       console.log('Error',err);
                   }
                   else{

                    var collect = client.db('Easypolicy_db').collection('Policies');

                    collect.insertOne(data, (err,resp) => {

                                  if(err){
                                    console.log('Error',err);
                                  }
                                  else{

                                    res.send("Data add successfully");
                                  }

                    });
            }
    });

});

module.exports = router;

