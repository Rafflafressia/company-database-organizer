const express = require("express");
const mysql = require ("mysql2");
const cTable = require("console.table");
const inquirer = require ("inquirer");
const userPrompts = require("./utils/inquirerPrompts");

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

// View All Departments
  function viewAllDepartments(){
    db.query("SELECT * FROM department", function (err, results) {
        console.table(results);
    });
    initEmployeeDatabaseApp();
  }

// View all Job Titles, Role ID and Department the role belongs to and salary
function viewAllRoles(){
    // job title, role id, the department that role belongs to, and the salary for that role
    db.query("SELECT roles.title, roles.id, department.dep_name, roles.salary FROM roles JOIN department ON roles.department_id = department.id", function (err, results) {
        console.table(results);
    });
    initEmployeeDatabaseApp();
}

// View Employee Information, Job Title, Department they belong to and Manager for the position
function viewAllEmployees(){
    db.query("SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.dep_name, roles.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name  FROM employees JOIN roles ON employees.role_id = roles.id JOIN department ON roles.department_id = department.id JOIN employees AS manager ON manager.id = employees.manager_id", function (err, results) {
        if(err){
            console.error("Could not retrieve table data");
            return;
        }
        
        console.table(results);
        initEmployeeDatabaseApp();
    });
}

// Add a new department
function addDepartment() {
    console.log("Adding Department");
  
    const newDepartment = [
      {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the new department? ",
      },
    ];
  
    inquirer
      .prompt(newDepartment)

      .then((answers) => {

        const addDep = answers.newDepartment.toUpperCase();

        db.query(
          `INSERT INTO department (dep_name) VALUES ("${addDep}")`,
          (err, results) => {
            if (err) {
              console.error("Could not instert data into table", err);
            }
  
            console.log("Department list updated");

            console.table(results);

            initEmployeeDatabaseApp();
          }
        );
      })
      .catch((error) => {
        console.log("Bonobo: Prompt Error", error);
      });
  }

// Add a new role
function addRole() {
    
    db.query("SELECT * FROM department", function (err, department) {
      if (err) {
        console.error("Couldn't retrieve departments columns", err);
      }
  
      // Stores the department names array into variable
      const choices = department.map(({ dep_name, id }) => ({
        name: dep_name,
        value: id,
      }));
  
      // Inquirer Prompts
      const newRole = [
        {
          type: "input",
          name: "title",
          message: "What is the name of the new position?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for the new position?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department is this position a part of?",
          choices: choices,
        },
      ];
  
      inquirer
        .prompt(newRole)
        .then((answers) => {
          db.query("INSERT INTO roles SET ?", {
            title: answers.title,
            salary: answers.salary,
            department_id: answers.department_id
            },
            (err, results) => {

                if (err){
                    console.log("Elephant: Could not update new position");
                }

                console.log("New position has been added!");

                db.query("SELECT * FROM roles", (err, results) =>{
                    if(err){
                        console.log("Cannot retrieve roles table");
                    }
                    console.table(results);
                })

            })
        })
        .catch((error) => {
          console.log("Chimp: Prompt Error", error);
        });
    });
  }

// Add a new employee
function addEmployee() {

    // Retrieve Columns in Roles
    db.query("SELECT * FROM roles", function (err, roles) {
      if (err) {
        console.error("Error retrieving columns", err);
        return;
      }
  
      // Stores role names into variable
      const rChoices = roles.map(({title, id}) => ({
          name: title,
          value: id
        }));
  
      // Retrieve columns in employees
      db.query("SELECT * FROM employees", function (err, employees){
  
        if(err){
  
          console.error("Error retrieving columns", err);
          return;
  
        }
  
        // Store Employee First name and Last name and ID into variable
        const mChoices = employees.map(({first_name, last_name, id}) => ({
          name: `${first_name} ${last_name}`,
          value: id,
        }));
  
        // Inquirer Prompts
        const newEmployee = [
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's First Name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's Last Name?",
          },
          {
            type: "list",
            name: "role",
            message: "What is the employee's job position?",
            choices: rChoices,
          },
          {
            type: "list",
            name: "manager",
            message: "Please select the manager for this employee: ",
            choices: mChoices,
          },
        ];
    
        inquirer
          .prompt(newEmployee)
          .then((answers) => {
            db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)",
            [
            answers.first_name,
            answers.last_name,
            answers.role,
            answers.manager
            ],
            (err, results) => {
                
              if (err){
                console.error("Could not update employee", err);
                return;
              };

              console.log("Employee list has been updated");
              
              db.query("SELECT * FROM employees", (err, results) => {
                if (err){
                    console.log("Could not retrieve employees table", err);
                    return;
                }

                console.table(results);

                initEmployeeDatabaseApp();

              })
            }
            )})
          .catch((error) => {
            console.log("Baboon: Prompt Error", error);
          });
      })
    });
  }


// Delete Employee
function deleteEmployee(){

    // Getting the employees table
    db.query("SELECT * FROM employees", (err, results) =>{
        if(err){
            console.error("Could not retrieve employees table");
        }
        
        const employees = results.map(({first_name, last_name, id}) => ({
            name: `${first_name} ${last_name}`,
            value: id,
        }));

        inquirer
        .prompt([
            {
                type: "list",
                name: "employee",
                message:"Please select the employee to remove",
                choices: employees
            }
        ])
        .then((answers) => {
            db.query("DELETE FROM employees WHERE ?", answers.employee.id, (err, results) =>{
                if (err){
                    console.error("Could not update employees table", err);
                    return;
                }

                console.log("Employee has been removed from database");

                initEmployeeDatabaseApp();
            })
        })
        .catch((error) => {
            console.error("Invalid Prompt Selections", error);
        })
    })
}

  function initEmployeeDatabaseApp() {
    
    userPrompts()
    .then(answers => {

        switch(answers.menu){

            case "View All Employees":
                viewAllEmployees();
                break; 

            case "Add Employee":
                addEmployee();
                break;

            case "Update Employee Role":
                updateEmployeeRole();
                break; 
            
            case "View All Roles":
                viewAllRoles();
                break;
            
            case "Add Role":
                addRole();
                break;

            case "View All Departments":
                viewAllDepartments();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Remove Employee":
                deleteEmployee();
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