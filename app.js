const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = require("./db/connection");

// // connecting to mysql
// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3001,
//     user: "root",
//     password: "Clarke@1993",
//     database: "employee_tracker",
//   });

//   // application starter
//   connection.connect( (err) =>{
//     if (err) throw err;
//     console.log("Connected To Database")

//   });

const options = [
  {
    type: "list",
    name: "selection",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update Role",
      "Exit"
    ],
  },
];

const mainPrompt = () => {
  inquirer.prompt(options).then((answer) => {
    switch (answer.selection) {
      case "View All Departments":
        viewAllDepartments();
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "View All Employees":
        viewAllEmployees();
        break;
      case "Add a Department":
        addDepartment();
        break;
      case "Add a Role":
        addRole();
        break;
      case "Add an Employee":
        addEmployee();
        break;
      case "Update Role":
        updateRole();
        break;
      case "Exit":
        db.end();
        break;
    }
  });
};

const viewAllDepartments = (req, res) => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, res) => {
    if (err) throw err;

    console.table(res);
    mainPrompt();
  });
};

const viewAllRoles = (req, res) => {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, res) => {
    if (err) throw err;

    console.table(res);
    mainPrompt();
  });
};

const viewAllEmployees = (req, res) => {
  const sql = `SELECT employee.first_name, employee.last_name,role.salary,role.title,department.name as "Department"
     FROM employee
     INNER JOIN role ON employee.role_id = role_id
     INNER JOIN department ON employee.role_id = role_id;`;
  db.query(sql, (err, res) => {
    if (err) throw err;

    console.table(res);
    mainPrompt();
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      { name: "name", type: "input", message: "What is the department name?" },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO department SET ?`,
        {
          name: answer.name,
        },
        (err) => {
          if (err) throw err;
          console.log(answer);

          mainPrompt();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the name of the role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?",
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the department for this role?",
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO role SET ?`,
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        (err) => {
          if (err) throw err;
          console.log(answer);

          mainPrompt();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee last name?",
      },
      { name: "role_id", type: "input", message: "What is role employee?" },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO employee SET ?`,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
        },
        (err) => {
          if (err) throw err;
          console.log(answer);
          console.log(
            `You have created an employee ${answer.first_name} ${answer.last_name} with a role of ${answer.role_id}.`
          );

          mainPrompt();
        }
      );
    });
};

const updateRole = () => {
  sql = `SELECT employee.first_name, employee.last_name, role.salary, role.title, role.id, department.name as "Department Name"
  FROM employee
  INNER JOIN role ON employee.role_id = role.id
  INNER JOIN department ON role.department_id = department.id `;
  db.query(sql, (err, res) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "employeeChoice",
          type: "list",
          choices: () => {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(`${res[i].first_name} ${res[i].last_name}`);
            }
            return choiceArray;
          },
          message: "Which employee do you want to change?",
        },
      ])
      .then(() => {
        const sql = `SELECT role.title, role.id, role.salary
      FROM role`;
        db.query(sql, (err, res) => {
          if (err) throw err;
          inquirer.prompt([
            {
              name: "roleChoice",
              type: "list",
              choices: function () {
                var roleChoiceArray = [];
                for (var i = 0; i < res.length; i++) {
                  roleChoiceArray.push(res[i].title);
                }

                return roleChoiceArray;
              },
              message: "Which role do you want to apply to the employee?",
            },
          ]).then((answer)=> {
            console.log(answer);
            // variables for update
            var role_id, employeeId;
            const sql =  `SELECT employee.first_name, employee.last_name, employee.id
            FROM employee`
            // searching and matching for name
           db.query(sql,(err, res) =>{
                if (err) throw err;
                for (var i = 0; i < res.length; i++) {
                  if (
                    `${res[i].first_name} ${res[i].last_name}` ===
                    answer.employeeChoice
                  ) {
                    employeeId = res[i].id;
                  }
                }
                // searching and matching for title
                const sql = `SELECT role.title, role.salary, role.id
                FROM role`
                db.query(sql,(err, res)=> {
                    if (err) throw err;
    
                    for (var i = 0; i < res.length; i++) {
                      if (`${res[i].title}` === answer.roleChoice) {
                        role_id = res[i].id;
                      }
                    }
                    const params = [{role_id: role_id},{id: employeeId}]
                    db.query(`UPDATE employee SET ? WHERE ?`,params,(err)=> {
                        if (err) throw err;
                        console.log("Employee's role has been changed.");
                        mainPrompt();
                      }
                    );
                  }
                );
              }
            );
          });
        });
      })
})
};
mainPrompt();
