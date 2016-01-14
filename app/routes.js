/** /app/route.js
 *route.js has deified all end points and forward request for corresponding controller.
 * @type {*|exports|module.exports as route}
 */
var express = require('express');  //load express module to crate instance of app
var config = require('./config/index'); //get secret key from configuration parameters
//The express.Router class can be used to create modular mountable route handlers.
// A Router instance is a complete middleware and routing system;
var router = express.Router();
//express-validation is a middleware that validates the body, params, query,
// headers and cookies of a request and returns a response with errors;
//we have used it for contact request parameters validation with JOI.
var validate = require('express-validation');

//load validation module to validate input requests parameter.
var validation = require('./utils/validation');
//All employees controllers are defined under Employee controller and would called as defined for corresponding end points.
var EmployeeController = require('./controllers/EmployeeController');
//=============================CREATE A EMPLOYEE, END POINT: "http://localhost:8000/api/v1/employee==============
router.route('/api/v1/employees')
    .post(validate(validation.employee), EmployeeController.employee.createEmployee);
//=======GET EMPLOYEE BASED ON EMPLOYEE ID, END POINT: "http://localhost:8000/api/v1/getEmployeeById==============
router.route('/api/v1/getEmployeeById')
    .post(validate(validation.getEmployeeById), EmployeeController.employee.getEmployeeById);
//===UPDATE EMERGENCY CONTACT BASED ON EMPLOYEE CODE, END POINT: "http://localhost:8000/api/v1/emergencyContacts==============
router.route('/api/v1/emergencyContacts')
    .post(validate(validation.emergencyContact), EmployeeController.employee.addEmergencyContacts);

//export router module.
module.exports = router;
