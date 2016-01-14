var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var EmployeeSchema = Schema({
    employeeCode: {type: Number, required: true},
    firstName: String,
    lastName: String,
    address: String,
    telephoneNumber: Number,
    mobileNumber: Number,
    DOB: Date,
    SSN: Number,
    EmergencyContacts: [{ type: Schema.Types.ObjectId, ref: 'EmergencyContact'}]
});

// make this available to our users in our Node applications
module.exports = mongoose.model('Employee', EmployeeSchema);