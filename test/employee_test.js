/**
 * Created by Khemchandj on 1/11/2016.
 */
var expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:8000');

describe('Employee', function () {
    //define employeeCode and employeeId variables so they can be saved after createe a employee and can be used as input for other test cases.
    var employeeCode;
    var employeeId;
    //Create a employee at end point /api/v1/employees with post method
    before('should return a 200 response and return employeeCode', function (done) {
        //create a employee object to send to API.
        var employee = {
            employee: {
                firstName: "Khemchand",
                lastName: "Joshi",
                address: "74, Sitapura, Jaipur",
                telephoneNumber: 1412748545,
                mobileNumber: 9898989898,
                DOB: 19820121,
                SSN: 2222222222222,
            }
        };
        api.post('/api/v1/employees')
            //set application inout request type as json.
            .set('Accept', 'application/json')
            //send eemployee object with request.
            .send(employee)
            //expect response as 200.
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                expect(res.body.status).to.equal('SUCCESS');
                employeeId = res.body.employee._id;
                employeeCode = res.body.employee.employeeCode;
                done();
            });


    });

    it('should return a 200 response after updating emergency contact', function (done) {
        //create a emergencyContact object.
        var emergencyContact = {
            emergencyContact: {
                name: "Rahul Joshi",
                contactNumber: 4564564561,
                relationship: "father",
                employeeCode: employeeCode
            }
        };
        //Call API with object.
        api.post('/api/v1/emergencyContacts')
            .set('Accept', 'application/json')
            .send(emergencyContact)
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                expect(res.body.status).to.equal('SUCCESS');
                done();
            });


    });

    it('should return a 200 response and employee detail', function (done) {
        var employee = {
            employee: {
                employeeId: employeeId
            }
        };
        api.post('/api/v1/getEmployeeById')
            .set('Accept', 'application/json')
            .send(employee)
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                expect(res.body.status).to.equal('SUCCESS');
                done();
            });


    });

});
