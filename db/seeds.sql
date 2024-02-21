-- Departments Table
INSERT INTO department (dep_name)
VALUES 
( "TECHNICAL SUPPORT"),
( "CUSTOMER SERVICE"),
( "FLOOR MACHINES OPERATORS"),
( "WAREHOUSE");

-- Roles Table
INSERT INTO roles ( title, salary, department_id)
VALUES
( "Jr. Technician", 60000, 1),
( "Sr. Technician", 80000, 1),
( "Customer Service Representative", 36000, 2),
( "Customer Relations Manager", 50000, 2),
( "Forklift Operator", 60000, 3),
( "Warehouse Foreman", 75000, 4);

-- Employee Table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
( "Jane", "Doe", 1, NULL),
( "John", "Doe", 2, 1),
( "Fiona", "Lynch", 2, 1),
( "Farrel", "Williams", 3, 1),
( "Farouk", "Bendi", 4, NULL),
("Gabe", "Barrela", 5, NULL),
( "Gundam", "Tanaka", 5, 6),
( "Jeffery", "Chandrapandhani", 5, 6),
( "Sonia", "Nevermind", 6, NULL);
