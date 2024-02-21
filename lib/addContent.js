const inquirer = require("inquirer");

function addEmployee(db) {
  db.query("SELECT * FROM roles", function (err, results) {
    if (err) {
      console.error("Error retrieving columns", err);
    }

    let choices = results.map((role) => role.title);

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
        choices: choices,
      },
      {
        type: "list",
        name: "salary",
        message: "Please select employee's starting salary: ",
        choices: [50000, 60000, 65000, 70000, 90000],
      },
    ];

    inquirer
      .prompt(newEmployee)
      .then((answers) => {
        console.log(answers);
      })
      .catch((error) => {
        console.log("Baboon: Prompt Error", error);
      });
  });
}

function addRole(db) {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.error("Couldn't retrieve departments columns", err);
    }

    // Stores the department names array into variable
    const choices = results.map(({ dep_name, id }) => ({
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
        console.log(answers);
      })
      .catch((error) => {
        console.log("Chimp: Prompt Error", error);
      });
  });
}

function addDepartment(db) {
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
      db.query(
        `INSERT INTO department (dep_name) VALUES ("${answers.newDepartment}")`,
        (err, results) => {
          if (err) {
            console.error("Could not instert data into table", err);
          }

          console.log("Department list has been updated!");
        }
      );
    })
    .catch((error) => {
      console.log("Bonobo: Prompt Error", error);
    });
}

module.exports = {
  addEmployee: addEmployee,
  addRole: addRole,
  addDepartment: addDepartment,
};
