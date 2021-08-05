const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = require("./db/connection")

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
    name: "menue",
    message: "What would you like to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update Role",
    ],
  },
];

const mainPrompt = () => {
  inquirer.prompt(options).then((answer) => {
    switch (answer.menue) {
      case "View All Departments":
        viewAllDepartments()
        break;
      case "View All Roles":
        promptIntern();
        break;
      case "View All Employees":
        promptIntern();
        break;
      case "Add a Department":
        promptIntern();
        break;
      case "Add a Role":
        promptIntern();
        break;
      case "Add an Employee":
        promptIntern();
        break;
      case "Update Role":
        promptIntern();
        break;
        case "Exit":
            db.end();
            break;
    }
  });
};



const viewAllDepartments = (req, res)=>{
    const sql = `SELECT * FROM department`
    db.query(sql, (err, res) => {
          if (err) throw err;
    
          console.table(res);
          questions();
        }
      );
  };




mainPrompt()

