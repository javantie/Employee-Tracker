USE employee_tracker;
SELECT employee.first_name, employee.last_name, role.salary, role.title, department.name as "Department Name",Manager.first_name
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee Manager ON employee.manager_id= Manager.id