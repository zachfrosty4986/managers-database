const inquirer = require('inquirer');
const { Pool } = require('pg');

const pool = new Pool(
    {
        user: 'postgres',
        password: '',
        host: 'localhost',
        database: 'store_db'
    },
    console.log(`Connected to the store_db Database!`)
)

pool.connect();

const questions = [
    {
        type: 'list',
        name: 'departmentList',
        message: 'What would you like to do?:',
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
    }
]
// 8 Functions for the choices
// Inside Init function, have an if statement to view a section 
function init() {
    inquirer.prompt(questions).then((answers) => {

    })
};

function viewAllEmployees() {
    const employees = store_db.getAllEmployees();

    employees.forEach(employee => {
        console.log(`${employee.first_name} ${employee.last_name} - ${employee.role_id}`)
    });
};

viewAllEmployees();

function addEmployee(first_name, last_name, role_id) {
    const newEmployee = {
        first_name: first_name,
        last_name: last_name,
        role_id: role_id
    };

    store_db.saveEmployee(newEmployee)

    console.log(`Employee ${first_name} ${last_name} added successfully!`)
};
addEmployee(newEmployee);

function updateEmployeeRole(first_name, last_name, newRole) {

    const employee = store_db.getEmployeeByName(first_name, last_name);

    if (employee) {
        employee.role = newRole;

        store_db.updateEmployee(employee);

        console.log(`Employee role sucessfully updated for employee ${first_name} ${last_name} in database!`)
    } else {
        console.log(`Employee ${first_name} ${last_name} not found in database :(`)
    }
};

updateEmployeeRole(first_name, last_name, newRole);

function viewAllRoles() {

    const roles = store_db.getAllRoles();

    roles.forEach(role => {
        console.log(`Role: ${role.title}`);
        console.log(`Department: ${role.department_id}`);
        console.log(`Salary: ${role.salary}`);
        console.log("---------------------")
    });
};

viewAllRoles();

function addRole(title, department_id, salary) {
    const newRole = {
        title: title,
        department_id: department_id,
        salary: salary
    };

    store_db.saveRole(newRole);

    console.log(`Role ${title} has been added sucessfully in the ${department_id} department, with a salary of ${salary} to the database!`)
};

addRole(newRole);

function viewAllDepartments() {

    const departments = store_db.getAllDepartments();

    departments.forEach(department => {
        console.log(`Department Name: ${department.name}`);
        console.log("------------------")
    });
};

viewAllDepartments();

function addDepartment(name) {
    const newDepartment = {
        name: name
    };

    store_db.saveDepartment(newDepartment);

    console.log(`Department ${name} added successfully to database!`);

};

addDepartment(newDepartment);

pool.query();