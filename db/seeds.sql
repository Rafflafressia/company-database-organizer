-- Departments Table
INSERT INTO department (id, dep_name)
VALUES 
(1, "TECHNICAL SUPPORT"),
(2, "CUSTOMER SERVICE"),
(3, "FLOOR MACHINES OPERATORS"),
(4, "WAREHOUSE");

-- Roles Table
INSERT INTO roles (id, title, salary, department_id)
VALUES
(1, "Jr. Technician", 60000, 1),
(2, "Sr. Technician", 80000, 1),
(3, "Customer Service Representative", 36000, 2),
(4, "Customer Relations Manager", 50000, 2),
(5, "Forklift Operator", 60000, 3),
(6, "Warehouse Foreman", 75000, 4);

-- Employee Table
INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES
(1, "Jane", "Doe", 1, NULL),
(2, "John", "Doe", 2, 1),
(3, "Fiona", "Lynch", 2, 1),
(4, "Farrel", "Williams", 3, 1),
(5, "Farouk", "Bendi", 4, NULL),
(6, "Gabe", "Barrela", 5, NULL),
(7, "Gundam", "Tanaka", 5, 6),
(8, "Jeffery", "Chandrapandhani", 5, 6),
(9, "Sonia", "Nevermind", 6, NULL);
