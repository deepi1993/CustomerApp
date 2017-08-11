

var mongoose = require('mongoose');
mongoose.connect('mongodb://vikram:vikram@ds131492.mlab.com:31492/readyapi', {
    useMongoClient: true
});


mongoose.Promise = require('bluebird');


var Vehicle = require('./models/vehicle-info');
var VehicleReg = require('./models/vehicle-reg');




// add service to the vehicle database
var serviceName = "flattyretubeless";
var dayCharge = 44;
var nightCharge = 44;
var tag = "breakdown";
var tnc = "additional taxes applied";
var servicecode = "ftb01";


//         Vehicle.updateMany({}, {$set:{"vehicle.image":"","vehicle.makeImage":"https://media.zigcdn.com/media/content/2015/May/hero-honda-logo-04052015-m1-720x540_720x540.jpg","vehicle.modelImage":"https://media.zigcdn.com/media/content/2015/May/hero-honda-logo-04052015-m1-720x540_720x540.jpg"}, $push: { "service_info": {"servicename":serviceName,"daycharge":dayCharge,"nightcharges":nightCharge, "tag":tag,"tandc":tnc, "servicecode":servicecode}, }}, { new: true }, function (err, vehicle) {
//             if (err) {
//                return console.log(err);
//             }
//             console.log(vehicle)

// })


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



//  Vehicle.findOne({ "_id": "5970d1afa315c90011b87e2b" }, function (err, vehicleinfo) {
//             if (err) {
//                 var rs = {};
//                 rs.Success = false;
//                 rs.Message = err;
//                 console.log(rs);
//             }
//             if (vehicleinfo === null) {
//                 var rs = {};
//                 rs.Success = true;
//                 rs.Registerd = false;

//                 rs.Message = "ID not found"
//                 return console.log(rs)
//             }
//             var rs= {};
//             rs.services = [];
//             for(var i = 0; i<vehicleinfo.service_info.length; i++)
//             {
//                 if(vehicleinfo.service_info[i].tag = "breakdown")
//                 {
//                      delete vehicleinfo.service_info[i]["tag"];
//                      delete vehicleinfo.service_info[i]["servicecode"];
//                     rs.services.push(vehicleinfo.service_info[i]);
//                 }

//             }
//         console.log(rs);
//         })