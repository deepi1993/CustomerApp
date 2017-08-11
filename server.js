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
            var newvehicle = new VehicleReg({ vehicleRegNo: JSON.parse(req.body.reg_id), vehicleType: JSON.parse(req.body.vehicleType) });
            newvehicle.save(function (err) {
                if (err) {
                    var rs = {};
                    rs.Success = false;
                    rs.Registerd = false;
                    rs.Message = "Vehicle info not saved"
                   res.status(200).send(rs);
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
            returnres.status(200).send(rs)
        }
        // if vehicle registered then take out the vehicle id. Return back the make and model and service details.
        var vId = vehicle1.vehicleId;
        Vehicle.findOne({ "_id": vId }, function (err, vehicle2) {
            if (err) {
                var rs = {};
                rs.Success = false;
                rs.Message = err;
                returnres.status(200).send(rs);
            }
            if (vehicle2 === null) {
                var rs = {};
                rs.Success = true;
                rs.Registerd = false;

                rs.Message = "Registered vehicle make model not found"
                returnres.status(200).send(rs)
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



//APi to send all the models of a make
app.post('/models', (req, res) => {
    var reg_id = req.body.reg_id;
    var makeName = req.body.make;
    //update the registerd vehicle database for the given registration number
    Vehicle.aggregate([{ $match: { 'vehicle.make': makeName } }], function (err, allbikes) {
        if (err) {
            var rst = {};
            rst.Success = false;
            rst.Message = err;
            return res.status(200).send(rst);
        }
       
        if (allbikes.length === 0) {
            var rst = {};
            rst.Success = true;
            rst.Message = "make not found";
            return res.status(200).send(rst);
        }
        var rst = {};
        rst.Success = true;
        rst.Message = "Models for the given make with images";
        rst.models = [];

        for (var i = 0; i < allbikes.length; i++) {
            var obj = {};
            obj.modelName = allbikes[i].vehicle.model;
            obj.modelImage = allbikes[i].vehicle.modelImage;
            obj.uniqueId = allbikes[i]._id;
            rst.models.push(obj);
        }
        console.log(rst);
        res.status(200).send(rst);

    })
})


//sending required services
app.post('/services', (req, res) => {
    var reg_id = req.body.reg_id;
    var vehicleId = req.body.vehicleId;
    var serviceName = req.body.serviceName;

   
    Vehicle.findOne({ "_id": vehicleId }, function (err, vehicleinfo) {
            if (err) {
                var rs = {};
                rs.Success = false;
                rs.Message = err;
               res.status(200).send(rs);
            }
            if (vehicleinfo === null) {
                var rs = {};
                rs.Success = true;
                rs.Registerd = false;

                rs.Message = "ID not found"
                returnres.status(200).send(rs)
            }
            var rs= {};
            rs.services = [];
            for(var i = 0; i<vehicleinfo.service_info.length; i++)
            {
                if(vehicleinfo.service_info[i].tag = serviceName)
                {
                     delete vehicleinfo.service_info[i]["tag"];
                     delete vehicleinfo.service_info[i]["servicecode"];
                    rs.services.push(vehicleinfo.service_info[i]);
                }

            }
       res.status(200).send(rs);
        })

})


app.listen(port, () => {
   console.log(`started on port ${port}`);
});


module.exports = { app };

