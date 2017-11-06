const express = require('express');
const router = express.Router();
const userlist = require('../models/user');
const rpmlist = require('../models/rpm');
var FCM = require('fcm-push');

//npm install fcm-push
//get a list  from db
router.get('/userlist', function (req, res, next) {
    var data = {
        "Data": ""
    };
    userlist.find({}).then(function (rows) {
        data["Data"] = rows;
        //res.send(data);
        //console.log(data);
        res.render('userlist', { UserlistModel: data });
        
    })
    //res.render('userlist');
});

router.get('/rpmlist', function (req, res, next) {
    var data = {
        "Data": ""
    };
    rpmlist.find({}).then(function (rows) {
        data["Data"] = rows;
        //res.send(data);
        console.log(data);
        res.render('rpmlist', { RpmlistModel: data });
        
    })
    //res.render('userlist');
});

router.get('/sendNotification', function (req, res, next) {
    
    var serverKey = 'AAAAbpTsC4g:APA91bHiXkzVwKNB_C99kMRtEFXVXi_qw474cEzq2CMDfAgGZ3-SHexmZcRmnnCOX3-3GuX_yquOuNGK1MMdIDnLjtoWOMQEi1QVlRz5XXYO2c5sa-mg3uhMPQ9THTV7BYw5wAoUgXcL';
    var fcm = new FCM(serverKey);
    
    var message = {
        to: '/topics/global', // required fill with device token or topics
        //collapse_key: 'your_collapse_key', 
        data: {
            message: 'Test notification'
        },
        notification: {
            title: 'Test notification',
            body: 'Body of test push notification'
        }
    };
    
    //callback style
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
            res.send("Failure");
        } else {
            console.log("Successfully sent with response: ", response);
            res.send("Success");
        }
    });
    
    /* //promise style
    fcm.send(message)
        .then(function(response){
            console.log("Successfully sent with response: ", response);
        })
        .catch(function(err){
            console.log("Something has gone wrong!");
            console.error(err);
        }) */
});

module.exports = router;

