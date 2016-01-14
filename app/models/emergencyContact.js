var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var EmergencyContactSchema = Schema({
    name: String,
    contactNumber: Number,
    relationship: String,
    employeeCode: { type: Number, ref: 'Employee' }
});


// make this available to our users in our Node applications
module.exports = mongoose.model('EmergencyContact', EmergencyContactSchema);
