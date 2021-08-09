DROP DATABASE IF EXISTS mployee_watcher ;
CREATE DATABASE mployee_watcher ;

-- using the database
USE mployee_watcher ;

-- Deleting if the tables already exists
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;
-- Creating a database


-- creating department table
CREATE TABLE department (

id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR(30) NOT NULL
 
);

-- Creating role table
CREATE TABLE role (

id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY (department_id) REFERENCES department (id)
);

-- Creating employee table
CREATE TABLE employee (

id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
FOREIGN KEY (role_id) REFERENCES role (id),
manager_id INTEGER NULL,
FOREIGN KEY (manager_id) REFERENCES employee (id)
);