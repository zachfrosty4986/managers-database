SELECT department.department_name AS department, employee.first_name
FROM employee
LEFT JOIN department
ON employee.role_id = department.id
ORDER BY department.department_name;
