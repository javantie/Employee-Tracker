DROP TABLE IF EXISTS employee;

-- Creating employee table
CREATE TABLE employee (
    id INTEGER  AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30)  NOT NULL,
    last_name VARCHAR(30)  NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (role_id) 
    REFERENCES role (id),
    FOREIGN KEY (manager_id ) 
    REFERENCES employee (id)
)

-- creating department table
CREATE TABLE departments (
    id INTEGER  AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)  NOT NULL
)
-- Creating role table
CREATE TABLE role (
    id INTEGER  AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30)  NOT NULL,
    salary VARCHAR(30)  NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id)
    REFERENCES department (id)
)