const mongoose = require('mongoose');

const location = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    },
    
    city_id: {
    type: Number,
    default: 0,
    },
    
    location_id: {
     type: Number,
     default: 0,
     },
    
    city: {
    type: String,
    required: true,
    },
    country_name:{
    type: String,
    required: true,
     },
})
module.exports = mongoose.model('location', location)

                                 //db         //schema value