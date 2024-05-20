const employeeModel = require("../models/employee.model/employee.model");
async function getEmployees(req, res)
{
    try
    {
        const {username, password, email, mobilenumber, vehiclemodel, vehiclenumber, verified, active} = req.body;
        const employee = await employeeModel.create({
            username:username,
            password:password,
            email:email,
            mobilenumber:mobilenumber,
            vehiclemodel:vehiclemodel,
            vehiclenumber:vehiclenumber,
            verified:verified
        });
        console.log("Inserted to employee collection");
        res.status(200).json(employee);
    }
    catch(err)
    {
        res.status(404).json({message:"Error in inserting document to employee collection"});
    }
}