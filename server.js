const express = require("express");
const mysql = require ("mysql2");
const cTable = require("console.table");
const userPrompts = require("./lib/inquirerPrompts");
const {viewAllEmployees, viewAllRoles, viewAllDepartments} = require("./lib/viewContent");
const {addEmployee, addRole, addDepartment} = require("./lib/addContent");
const {updateEmployeeRole} = require("./lib/updateContent");


const PORT = process.env.PORT || 3001; 
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password1234',
      database: 'employee_db',
    },
    console.log(`Connected to the employee_db database.`)
  );

  app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    initEmployeeDatabaseApp();
  });

  function initEmployeeDatabaseApp() {
    
    userPrompts()
    .then(answers => {

        switch(answers.menu){

            case "View All Employees":
                viewAllEmployees(db);
                break; 

            case "Add Employee":
                addEmployee(db);
                break;

            case "Update Employee Role":
                updateEmployeeRole(db);
                break; 
            
            case "View All Roles":
                viewAllRoles(db);
                break;
            
            case "Add Role":
                addRole(db);
                break;

            case "View All Departments":
                viewAllDepartments(db);
                break;

            case "Add Department":
                addDepartment(db);
                break;

            case "Exit":
                db.end((err) => {
                    if (err){
                        console.error("Error disconnecting from database: " + err.stack);
                        return;
                    }
                    console.log("Disconnected from database. Hit CTRL/Command+C to exit application.");
                });
                break;

            default: 
            console.log("Prompt Invalid")
            initEmployeeDatabaseApp();
        }

    })
    .catch(error => {
        console.log("Prompt Error", error);
    });
  }