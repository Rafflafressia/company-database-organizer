const inquirer = require("inquirer");

const mainmenu = {
    type: "list",
    name: "menu",
    message: "What would you like to do?",
    choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Remove Employee",
        "Update Employee Role",
        "Exit",
    ]
};

function userPrompts() {
    return inquirer.prompt(mainmenu);
}

module.exports = userPrompts;