#How to reference a mongoose schema in mongoose model and populate object
#Create models
1. I have created two models in ./app/models employee.js and emergencyContact.js
2. in employee model, EmergencyContacts is array of reference of EmergencyContact schema( type: Schema.Types.ObjectId, ref: 'EmergencyContact'}
3. in EmergencyContact, I have taken employeeCode as same as employee to get all conatcts based on employee codes incase needed.

#Create end points under ./app/routes
1. First end point is http://localhost:8000/api/v1/employees as post method where we will expect employee object withour employeeCode as employee code would be auto generated.
   we are using JOI module to validate request parameters so validate(validation.employee) will validte based on rules efined in ./app/utilss/validations file.
   Once it is passed all validation, Employee controller would be called with createEmployee method.
    
    router.route('/api/v1/employees')
            .post(validate(validation.employee), EmployeeController.employee.createEmployee);
        
2. Second end point is to get employee based on employee ID.
   end point for it is http://localhost:8000/api/v1/getEmployeeById, same first all validation would be passed then pass to corresponding controller method.
 
    router.route('/api/v1/getEmployeeById')
        .post(validate(validation.getEmployeeById), EmployeeController.employee.getEmployeeById);
        
3. Third end point is to update emergency conatct information.
    
    router.route('/api/v1/emergencyContacts')
        .post(validate(validation.emergencyContact), EmployeeController.employee.addEmergencyContacts);
        
        
#Populate emergencyContact in employee details.
1. when getEmployeeById would be called in controller ./app/controllers/EmployeeController, it would be passed to getEmployeeById method.
2. where first employee would be find vase om enployee ID then will be populated Emergency conatct.
        
        return Employee.findOne({_id: req.body.employee.employeeId})
                .populate('EmergencyContacts')
                .exec();
                
3. If you would like to populate only selected propoerties from refrence schema then you cn use this
        
        return Employee.findOne({_id: req.body.employee.employeeId})
                .populate('EmergencyContacts', 'name')
                .exec();
