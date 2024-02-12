const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, " +
          "role.title, department.name AS department, role.salary, " +
          "CONCAT(manager.first_name, ' ', manager.last_name) AS manager " +
          "FROM employee " +
          "LEFT JOIN role ON employee.role_id = role.id " +
          "LEFT JOIN department ON role.department_id = department.id " +
          "LEFT JOIN employee manager ON manager.id = employee.manager_id;"
      );
  }

  createEmployee(first_name, last_name, role_id, manager_id) {
    return this.connection.promise().query("INSERT INTO employee SET ?", {
      first_name: first_name,
      last_name: last_name,
      role_id: role_id,
      manager_id: manager_id,
    });
  }

  updateEmployeeRole(roleId, employeeId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        roleId,
        employeeId,
      ]);
  }

  findRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, " +
          "role.salary FROM role " +
          "LEFT JOIN department ON role.department_id = department.id;"
      );
  }

  createRole(role, salary, department) {
    return this.connection.promise().query("INSERT INTO role SET ?", {
      title: role,
      salary: salary,
      department_id: department,
    });
  }

  findDepartments() {
    return this.connection
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }

  createDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }
}

module.exports = DB;
