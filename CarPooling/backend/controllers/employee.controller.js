const employeeModel = require("../models/employee.model/employee.model");


async function saveEmployee(req, res) {
    try {
        const { userName, password, email, mobileNumber, vehicleModel, vehicleNumber, verified, active } = req.body;
        const employee = await employeeModel.create({
            userName: userName,
            password: password,
            email: email,
            mobileNumber: mobileNumber,
            vehicleModel: vehicleModel,
            vehicleNumber: vehicleNumber,
            verified: verified,
            active: active
        });
        console.log("Inserted to employee collection");
        res.status(200).json(employee);
    }
    catch (err) {
        res.status(404).json({ message: "Error in inserting document to employee collection" });
    }
}


async function getEmployeeById(req, res) {
    try {
        const _id = parseInt(req.params.id);
        const employee = await employeeModel.find({ _id });
        res.status(200).json(employee);
    }
    catch (err) {
        res.status(404).json({ message: "Error in finding the employee" });
    }
}


async function editEmployee(req, res) {
    try {
        const { body } = req;
        const _id = parseInt(req.params.id);
        const old = await employeeModel.find({ _id });
        const Employee = await employeeModel.findByIdAndUpdate({ _id }, { ...old, ...body });
        console.log(Employee);
        const newEmployee = await employeeModel.find({ _id });
        console.log(newEmployee);
        res.status(200).json(newEmployee);
    }
    catch (err) {
        res.status(404).json({ message: "Error in updating the employee" });
    }
}


async function getEmployee(req, res) {
    try {
        const employees = await employeeModel.find({});
        console.log("Employee documents are:");
        res.status(200).json(employees);
    }
    catch (err) {
        res.status(404).json({ message: "Error in finding the employees" });
    }
}


async function deleteEmployee(req, res) {
    try {
        const _id = parseInt(req.params.id);
        const employee = await employeeModel.findByIdAndDelete({ _id });
        console.log("Deleted employee documnet is:");
        res.status(200).json(employee);
    }
    catch (err) {
        res.status(404).json({ message: "Error in deleting the employees" });
    }
}


module.exports = { saveEmployee, editEmployee, getEmployee, getEmployeeById, deleteEmployee };