const inquirer = require("inquirer");
const connection = require("./db/connection");
const DB = require("./db/index");

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all Departments",
          "View all Roles",
          "View all Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee role",
          "Exit",
        ],
      },
    ])
    .then(({ action }) => {
      const db = new DB(connection);
      switch (action) {
        case "View all Departments":
          db.findDepartments().then((departments) => {
            console.table(departments[0]);
            start();
          });
          break;
        case "View all Roles":
          db.findRoles().then((roles) => {
            console.table(roles[0]);
            start();
          });
          break;
        case "View all Employees":
          db.findAllEmployees().then((employees) => {
            console.table(employees[0]);
            start();
          });
          break;
        case "Add a Department":
          promptToAddDepartment(db);
          break;
        case "Add a Role":
          promptToAddRole(db);
          break;
        case "Add an Employee":
          promptToAddEmployee(db);
          break;
        case "Update an Employee role":
          promptToUpdateEmployeeRole(db);
          break;
        case "Exit":
          console.log("Goodbye!");
          connection.end();
          break;
        default:
          console.log("Invalid choice.");
          start();
      }
    })
    .catch((error) => {
      console.error("Error occurred: ", error);
      start();
    });
}

function promptToAddDepartment(db) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the name of the department:",
        name: "name",
      },
    ])
    .then(({ name }) => {
      db.createDepartment({ name }).then(() => {
        console.log("Department added successfully!");
        start();
      });
    });
}

function promptToAddRole(db) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the title of the role:",
        name: "title",
      },
      {
        type: "input",
        message: "Enter the salary for this role:",
        name: "salary",
      },
      {
        type: "input",
        message: "Enter the department ID for this role:",
        name: "department_id",
      },
    ])
    .then(({ title, salary, department_id }) => {
      db.createRole(title, salary, department_id).then(() => {
        console.log("Role added successfully!");
        start();
      });
    });
}

function promptToAddEmployee(db) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the first name of the employee:",
        name: "first_name",
      },
      {
        type: "input",
        message: "Enter the last name of the employee:",
        name: "last_name",
      },
      {
        type: "input",
        message: "Enter the role ID for this employee:",
        name: "role_id",
      },
      {
        type: "input",
        message: "Enter the manager ID for this employee (if applicable):",
        name: "manager_id",
      },
    ])
    .then(({ first_name, last_name, role_id, manager_id }) => {
      db.createEmployee(first_name, last_name, role_id, manager_id).then(() => {
        console.log("Employee added successfully!");
        start();
      });
    });
}

function promptToUpdateEmployeeRole(db) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's ID whose role you want to update:",
        name: "employee_id",
      },
      {
        type: "input",
        message: "Enter the new role ID for this employee:",
        name: "role_id",
      },
    ])
    .then(({ employee_id, role_id }) => {
      db.updateEmployeeRole(role_id, employee_id).then(() => {
        console.log("Employee role updated successfully!");
        start();
      });
    });
}

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
  } else {
    console.log("Connected to the database.");
    start();
  }
});
