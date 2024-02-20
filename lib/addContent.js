const inquirer = require("inquirer");

function addEmployee(){
    console.log("Adding Employee");
}

function addRole(){
    console.log("Adding Role");
}

function addDepartment(){
    console.log("Adding Department");
}

module.exports = {
    addEmployee: addEmployee,
    addRole: addRole,
    addDepartment: addDepartment
};