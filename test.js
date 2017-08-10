

var mongoose = require('mongoose');
mongoose.connect('mongodb://vikram:vikram@ds131492.mlab.com:31492/readyapi', {
    useMongoClient: true
});


mongoose.Promise = require('bluebird');


var Vehicle = require('./models/vehicle-info');
var VehicleReg = require('./models/vehicle-reg');




// add service to the vehicle database
var serviceName = "minorrepair";
var dayCharge = 45;
var nightCharge = 54;
var tag = "minorrepair";
var tnc = "additional taxes applied";
var servicecode = "mt01";


        Vehicle.updateMany({}, {$set:{"vehicle.image":"","vehicle.makeImage":"https://media.zigcdn.com/media/content/2015/May/hero-honda-logo-04052015-m1-720x540_720x540.jpg","vehicle.modelImage":"https://media.zigcdn.com/media/content/2015/May/hero-honda-logo-04052015-m1-720x540_720x540.jpg"}, $push: { "service_info": {"servicename":serviceName,"daycharge":dayCharge,"nightcharges":nightCharge, "tag":tag,"tandc":tnc, "servicecode":servicecode}, }}, { new: true }, function (err, vehicle) {
            if (err) {
               return console.log(err);
            }
            console.log(vehicle)

})


// delete the data

//  Vehicle.updateMany({}, {$unset:{service_info:1}}, { new: true }, function (err, vehicle) {
//             if (err) {
//                return console.log(err);
//             }
//             console.log(vehicle);

// })

// insert data into registered vehicle database

// VehicleReg.insertMany([
//     {vehicleRegNo:"RJ142342",vehicleType:"bike",vehicleId:"5970d1afa315c90011b87e2b"},
//     {vehicleRegNo:"RJ149893",vehicleType:"bike",vehicleId:"5970d1afa315c90011b87e30"},
//     {vehicleRegNo:"RJ148983",vehicleType:"car",vehicleId:"5970d1afa315c90011b87e29"},
//     {vehicleRegNo:"RJ145283",vehicleType:"car",vehicleId:"5970d1afa315c90011b87e2a"}
// ])


// make = _.uniq(make);
    // console.log(make);

  

    // for(var j = 0; j<make.length; j++)
    // {
    //     _.find
    // }
//    console.log(allbikes);

    // for(var j = 0; j<make.length; j++)
    // {
    //    var c = _.groupBy(allbikes,make[j])
    //     console.log(c);
    // }
        // console.log(urls);