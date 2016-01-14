/**
 * Created by Khemchandj on 9/9/2015.
 */
//================LOAD ALL REQUIRED MODULE=====================================
//Object schema description language and validator for JavaScript objects.
var Joi = require('joi');
module.exports = {
    employee: {
        options: {flatten: true},
        body: {
            firstName: Joi.string().max(20),   //Fist Name should be a string and max length can be 20otherwise send a error message
            lastName: Joi.string().max(20),   //Last Name should be a string and max length can be 20 otherwise send a error message
            address: Joi.string(), //address should be a string
            telephoneNumber: Joi.number(), //Phone number should be number formatted
            mobileNumber: Joi.number(), //mobile number should be number formatted
            SSN: Joi.number().integer()//SSN number should be number formatted
        }
    },

    emergencyContact: {
        options: {flatten: true},
        body: {
            emergencyContact: {
                employeeCode: Joi.number().required(), //employee code must be a number  and required to be present in request body
                name: Joi.string(), //name should be a string
                contactNumber: Joi.number(), //conatct number should be a number
                relationship: Joi.string() //relatioship should be as string
            }
        }
    },
    getEmployeeById: {
        options: {flatten: true},
        body: {
            employee: {
                employeeId: Joi.string().required()//employe is should be a sting and must be provided in emaaployee object.
            }
        }
    }
}

