"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var seviceSchema = new Schema({

})

var VehicleList = new Schema({
    vehicle: {
        type: {
            type: String,
            trim: true
        },
        model: {
            type: String,
            trim: true
        },
        make: {
            type: String,
            trim: true
        },
        vehicle_sub_type: {
            type: String,
            trim: true
        },
        makeImage:{
            type:String,
            trim:true
        },
        modelImage:{
            type:String,
            trim:true
        },
        image:{
            type:String,
            trim:true
        }
    },
    service_info:
    [
    
        {
        
            _id: false,

            servicename:{
                type:String,
                trim:true
            },
            daycharge:{
                type:String
            },
            nightcharges:{
                type:String
            },
            tandc:{
                type:String,
                trim:true
            },
            tag:{
                type:String,
            },
            image:{
                type:String,
                trim:true
            },
            servicecode:{
                type:String,
                trim:true
            }

    }
    ]
});

module.exports = mongoose.model('master_vehicleDB', VehicleList);