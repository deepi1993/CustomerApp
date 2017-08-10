var express = require('express');
var bodyParser = require('body-parser');


var mongoose = require('mongoose');
mongoose.connect('mongodb://vikram:vikram@ds131492.mlab.com:31492/readyapi', {
    useMongoClient: true
});


mongoose.Promise = require('bluebird');
const _ = require('lodash');

var Vehicle = require('./models/vehicle-info');
var VehicleReg = require('./models/vehicle-reg');



var app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});



// API to check whether the vehicle is registerd or not
app.post('/registerd', (req, res) => {

    var reg_id = req.body.reg_id;
    var vehicleType = req.body.vehicleType;
    VehicleReg.findOne({ "vehicleRegNo": reg_id }, function (err, vehicle1) {
        if (err) {
            var rs = {};
            rs.Success = false;
            rs.Message = err;
           return res.status(200).send(rs);
        }
        //if vehicle not registered create new doccument for the vehicle and send all the make names and images for the vehicle type
        if (vehicle1 === null) {
            var newvehicle = new VehicleReg({ vehicleRegNo: req.body.reg_id, vehicleType: req.body.vehicleType });
            newvehicle.save(function (err) {
                if (err) {
                    var rs = {};
                    rs.Success = false;
                    rs.Registerd = false;
                    rs.Message = "Vehicle info not saved"
                     console.log(rs);
                }
                Vehicle.aggregate([{ $match: { 'vehicle.type': vehicleType } }], function (err, allbikes) {
                    if (err) {
                        var rs = {};
                        rs.Success = false;
                        rs.Registered = false;
                        rs.Message = "no make models available";
                        return res.status(200).send(rs);
                    }
                    else {

                        var rs = {};
                        rs.Success = true;
                        rs.Message = "sending makeName and makeImages"
                        rs.make = [];
                        for (var i = 0; i < allbikes.length; i++) {

                            var objmake = {};
                            objmake.makeName = allbikes[i].vehicle.make;
                            objmake.makeImage = allbikes[i].vehicle.makeImage;

                            rs.make.push(objmake);

                        }


                        rs.make = _.uniqBy(rs.make, 'makeName');

                        res.status(200).send(rs);

                    }
                })
            })
            return console.log(rs)
        }
// if vehicle registered then take out the vehicle id. Return back the make and model and service details.
        var vId = vehicle1.vehicleId;
        Vehicle.findOne({ "_id": vId }, function (err, vehicle2) {
            if (err) {
                var rs = {};
                rs.Success = false;
                rs.Message = err;
                return console.log(rs);
            }
            if (vehicle2 === null) {
                var rs = {};
                rs.Success = true;
                rs.Registerd = false;

                rs.Message = "Registered vehicle make model not found"
                return console.log(rs)
            }
            var rs = {};
            rs.success = true;
            rs.make = vehicle2.vehicle.make;
            rs.model = vehicle2.vehicle.model;
            rs.availableServices = vehicle2.service_info;
            res.status(200).send(rs);
            })


    })


})


app.listen(port, () => {
    console.log(`started on port ${port}`);
});


module.exports = { app };  

