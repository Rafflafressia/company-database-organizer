const inquirer = require("inquirer");

function viewAllEmployees(){
    console.log("viewing all employees");
}

function viewAllRoles(){
    console.log("Viewing All Roles");
}

function viewAllDepartments(){
    console.log("Viewing All Departments");
}

module.exports = {
    viewAllEmployees: viewAllEmployees,
    viewAllRoles: viewAllRoles,
    viewAllDepartments: viewAllDepartments
};