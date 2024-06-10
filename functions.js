const inquirer = require("inquirer");
const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: 'localhost',
        database: process.env.DB_NAME,
    },
    console.log(`Connected to the store_db Database!`)
);

async function addEmployee() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Please enter the First Name of the new Employee:',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Please enter the Last Name of the new Employee:',
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Please enter the Role ID of the new employee:'
        },
    ]);

    const { first_name, last_name, role_id } = answers;

    try {
        const result = await pool.query(
            'INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)',
            [first_name, last_name, role_id]
        );
        console.log("New Employee Sucessfully Added!");
    } catch (error) {
        console.error(error);
    }
}

async function updateEmployeeRole() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the Employee\'s First name?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the Employee\'s Last name?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the new role ID for this employee?'
        },
    ]);

    const { first_name, last_name, role_id } = answers;

    try {
        const result = await pool.query(
            'INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)',
            [first_name, last_name, role_id]
        );
        console.log(`New Role sucessfully updated for ${first_name} ${last_name}!`);
    } catch (error) {
        console.error(error);
    }
};

async function addRole() {
    const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your new role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?',
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What department ID does this role fall under?',
        },
    ];

    try {
        const answers = await inquirer.prompt(questions);

        const { title, salary, department_id } = answers; // Destructuring the answers object

        const result = await pool.query(
            'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)',
            [title, salary, department_id]
        );
        console.log("New Role Successfully Added!");
    } catch (error) {
        console.error(error);
    }
}

async function addDepartment() {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'department_name',
                message: "What is the name of your new department?",
            }
        ]);

        const departmentName = answers.department_name;

        try {
            const result = await pool.query(
                'INSERT INTO department (department_name) VALUES ($1)',
                [departmentName]
            );
            console.log("New Department Successfully Added!");
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
}

async function viewAllRoles() {
    try {
        const result = await pool.query(
            'SELECT title, salary, department_name FROM roles JOIN department ON department.id = roles.department_id'
        );
        console.table(result.rows); // Assuming you want to display the results in a table format
    } catch (error) {
        console.error(error);
    }
}

async function viewAllDepartments() {
    try {
        const result = await pool.query(
            'SELECT * FROM department'
        );
        console.log(result);
        console.table(result.rows)
    } catch (error) {
        console.error(error);
    }
}

async function viewAllEmployees() {
    try {
        const result = await pool.query(
            `SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.department_name,manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
             FROM employee
             JOIN roles ON employee.role_id = roles.id
             JOIN department ON department.id = roles.department_id
             LEFT JOIN employee AS manager ON manager.id = employee.manager_id;
             `
        );
        console.table(result.rows);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { addDepartment, viewAllDepartments, addRole, viewAllRoles, updateEmployeeRole, addEmployee, viewAllEmployees };