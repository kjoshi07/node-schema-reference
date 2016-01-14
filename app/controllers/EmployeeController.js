/**
 *User Controller for endpoint '/api/users/ POST/GET
 */
//=================Load all required module=============================================================
//Load q module to mitigate the callback hell
var Q = require('q');
//Load Employee model to do operation with mongoose
var Employee = require('../models/employee');
//Load emergency contact model
var EmergencyContact = require('../models/emergencyContact');

exports.employee = {
    /**
     * Create a employee at end point '/api/v1/employee'
     *
     * @param  {req as json} firstName(string), lastName(string), address(string), telephoneNumber(Number), mobileNumber(Number), DOB(Number) and SSN
     * @return {res as json} success if failed due to any reason or true(success), status code and message of success or failure
     */
    createEmployee: function (req, res) {
        //Used q library to mitigate the “Pyramid of Doom” instead of callbacks:
        Q.fcall(function () {
            //Find last inserted employee code so next code can be generated, if success then employee document would be passed to "Then" method,
            // if there is an error then would be cached under cache method.
            return Employee.find().sort({'employeeCode': -1}).limit(1);

        })
            .then(function (employee) {
                //If there was no error in finding then next this would be executed.
                var employeeCode;
                //as we used find command to find a last inserted employee code so it would return employee array.
                //If employee length is great then zero means employee record was return, else start fom employee code 1
                if (employee.length > 0) {
                    employeeCode = employee[0].employeeCode;
                    employeeCode++;
                } else {
                    employeeCode = 1;
                }
                //return employee code for next then method.
                return employeeCode;
            })

            .then(function (employeeCode) {
                //Once the employee code has been generated then save employee details in database.
                if (employeeCode) {
                    var newEmployee = new Employee({
                        employeeCode: employeeCode,
                        firstName: req.body.employee.firstName,
                        lastName: req.body.employee.lastName,
                        address: req.body.employee.address,
                        telephoneNumber: req.body.employee.telephoneNumber,
                        mobileNumber: req.body.employee.mobileNumber,
                        DOB: req.body.employee.DOB,
                        SSN: req.body.employee.SSN,

                    });
                    return newEmployee.save();
                } else {
                    //if there was an problem in genertaing employee code then retuen a error message to try again.
                    var response = {
                        status: "FAILED",
                        statusCode: 500,
                        error: "there was an problem in generating employee code, try again"
                    };

                    return res.json(response);
                }


            })
            //If employee information has been saved in database and there was no error then it would return to this then method.
            .then(function (savedEmployee) {
                var response = {
                    status: "SUCCESS",
                    statusCode: 200,
                    message: "Employee has been created successfully",
                    employee: {
                        _id: savedEmployee._id,
                        employeeCode: savedEmployee.employeeCode
                    }
                };

                return res.json(response);
            })
            //If there is any error in executing above blocks, then error would be cahced here and send a response with error message.
            .catch(function (error) {
                var response = {
                    status: "FAILED",
                    statusCode: 401,
                    error: error
                };

                return res.json(response);
            });

    },
    /**
     * get a employee based on employee ID at end point '/api/v1/getEmployeeById'
     *
     * @param  {req as json} employeeId(string)
     * @return {res as json} success if failed due to any reason or true(success), status code and message of success or failure
     */
    getEmployeeById: function (req, res) {
        Q.fcall(function () {
            //Find a employee based on employee ID and populate emergency contact details from emergency contact schema.
            return Employee.findOne({_id: req.body.employee.employeeId})
                .populate('EmergencyContacts')
                .exec();

        })
            //If employee finds based on employee ID then this block would be executed.and return success and employee data as response.
            .then(function (employee) {
                var response = {
                    status: "SUCCESS",
                    statusCode: 200,
                    employee: employee
                };

                return res.json(response);
            })
            //If there is any error in executing above blocks, then error would be cahced here and send a response with error message.
            .catch(function (error) {
                var response = {
                    status: "FAILED",
                    statusCode: 401,
                    error: error
                };

                return res.json(response);
            });

    },
    /**
     * Add a emergency contact based om employee ID at end point '/api/v1/addEmergencyContacts'
     *
     * @param  {req as json} name(string), conatctNumber(string), relatioship(string) and employee code(string).
     * @return {res as json} success if failed due to any reason or true(success), status code and message of success or failure
     */
    addEmergencyContacts: function (req, res) {
        Q.fcall(function () {
            //crate a emergencyContact object based on values received in request.
            var emergencyContact = new EmergencyContact({
                name: req.body.emergencyContact.name,
                contactNumber: req.body.emergencyContact.contactNumber,
                relationship: req.body.emergencyContact.relationship,
                employeeCode: req.body.emergencyContact.employeeCode
            });
            //save in database and if saved successfully then return to then method other cache.
            return emergencyContact.save();
        })
            //return here after saved emeregncy contact in database.
            .then(function (emergencyContact) {
                //If emergency contct saved then update employee document with emergencyContact ID
                // so later on all conatcts relate to employees can be fine.
                if (emergencyContact) {
                    return Employee.update({employeeCode: req.body.emergencyContact.employeeCode}, {$push: {EmergencyContacts: emergencyContact._id}})
                } else {
                    //if there is an error saving emergency conatct then return a error.
                    var response = {
                        status: "FAILED",
                        statusCode: 401,
                        error: 'Employee does not exist in system with EmployeeCode: ' + req.body.emergencyContact.employeeCode
                    };

                    return res.json(response);
                }

            })
            //After update employee document with emergencyContact ID, return success as response.
            .then(function () {
                var response = {
                    status: "SUCCESS",
                    statusCode: 200,
                    message: "Emergency Contact has saved for Employee"
                };

                return res.json(response);
            })
            //If there is any error in executing above blocks, then error would be cahced here and send a response with error message.
            .catch(function (error) {
                var response = {
                    status: "FAILED",
                    statusCode: 401,
                    error: error
                };

                return res.json(response);
            });

    }
};
