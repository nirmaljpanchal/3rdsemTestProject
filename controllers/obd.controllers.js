const obd = require('../models/obd');
const user = require('../models/user');
const fs = require('fs');
const xml2js = require('xml2js');




//**********ADD DATA TO OBD COLLECTION*******************/
module.exports.obdAddAll = function (req, res, next) {
    //getXMLData();
    // user.findById(req.body.id, function (err, user) {
    //     if (err) {
    //         res.send(err);
    //     }
    // })
    let newObd = new obd();
    newObd.name = req.body.name;
    newObd.value = req.body.value;
    newObd.user = req.body.id;

    newObd.save(function (err) {
        if (err) {
            return res.send(err);
        }
        else{
            res.json({ message: 'Obd was successful'});
        }
    });
    


}


//**********GET DATA FROM DTC COLLECTIONS*******************/
module.exports.obdGetAll = function (req, res, next) {
    var data = {
        "Data": ""
    };
    obd.find({}).then(function (rows) {
        data["Data"] = rows;
        res
            .status(200)
            .send(data);
        console.log("success");
    })

}


//**********GET ONE DATA FROM DTC COLLECTION THROUGH DTC COLLECTION ID******************/
module.exports.obdGetOne = function (req, res, next) {
    var data = obd.findById({ user: req.params.id }).then(function (rows) {
        res.send(rows);
        console.log(rows);
    });
    
    console.log(data);

}