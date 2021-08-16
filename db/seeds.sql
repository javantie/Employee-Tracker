INSERT INTO department (name) 
VALUES ("IT"),
("Marketing"),
("HR"),
("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer",100000,1),
("Collaborator", 45000,2),
("Recruiter",60000,3),
("Sales Person",45000,4);

INSERT INTO employee (first_name, last_name, role_id) 
VALUES ("Geek", "Nerd", 1),
("Famous", "Guy", 2),
("Strict", "Person", 4),
("Eddy", "joe", 3),
("Melissa", "Capers", 2),
("Micheal", "Clarke", 4);

