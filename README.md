# Employee Database Organizer

  ## Table of Contents
  - [Description](#description)
  - [User Story](#userstory)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Installation](#installation)
  - [Demonstration Video](#demonstration-video)
  - [Planned Updates](#planned-updates)
  - [License](#license)
  - [Collaborators](#collaborators)
  - [Usage](#usage) 
  - [Questions](#questions) 

## Description

This is an application to track, organize and update employee information. 

You can add employee, job positions and departments. 

Update employee information.

View specific information in tables. 

## User Story

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Acceptance Criteria

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

## Installation

Requires NodeJS, ExpressJS, Inquirer, mysql2, console.table

## Demonstration Video

https://www.youtube.com/watch?v=mwnDocTCKog

## Planned Updates

Refactor code so that there isn't as much repetitive code

Incorporate GUI for more streamlined UX

Handle concerns more efficiently

## License
MIT License

## Collaborators
edX Tutor: Jose Lopez

## Usage

For companies to keep track of a growing list of companies and concerns

## Questions
