INSERT INTO department (name)
VALUES ("FINANCE"),
("MARKETING"),
("SALES"),
("CUSTOMER SERVICE");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 65000, 3),
("Assitant Manager", 40000, 3),
("CEO", 150000, 1),
("CFO", 150000, 2);

INSERT INTO employee (first_name, last_name, role_id) 
VALUES ("Malik", "Jones", 2),
("James", "Brown", 1),
("Eddy", "Griffen", 3),
("Rich", "Long", 2);