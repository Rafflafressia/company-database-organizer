const inquirer = require("inquirer");
const cTable = require("console.table");

function viewAllEmployees(db){
    
    console.log("viewing all employees");
//a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    db.query("SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.dep_name, roles.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name  FROM employees JOIN roles ON employees.role_id = roles.id JOIN department ON roles.department_id = department.id JOIN employees AS manager ON manager.id = employees.manager_id", function (err, results) {
        console.table(results);
    });
}

function viewAllRoles(db){

    console.log("Viewing All Roles");

    db.query("SELECT * FROM roles", function (err, results) {
        console.table(results);
    });
}

function viewAllDepartments(db){

    console.log("Viewing All Departments");

    db.query("SELECT * FROM department", function (err, results) {
        console.table(results);
    });
}

module.exports = {
    viewAllEmployees: viewAllEmployees,
    viewAllRoles: viewAllRoles,
    viewAllDepartments: viewAllDepartments
};