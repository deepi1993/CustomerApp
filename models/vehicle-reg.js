"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var registrationSchema = new Schema({

    customerId:[
        {
            type:String,
            trim:true
        }
    ],
       
        lastUsedBy: {
            type:String,
            trim:true
         },
        vehicleRegNo:{
            unique:true,
            type:String,
            trim:true,
            required:true
        },
        vehicleType: {
            type:String,
            enum:['bike','car'],
            required:true
            },
        vehicleId: {
            type:String,
            trim:true,
            required:true
        }
        
});


module.exports = mongoose.model('registered_vehicle', registrationSchema);