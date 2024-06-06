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
    const newEmployee = { first_name, last_name, role_id };

    try {
        const result = await pool.query(
            'INSERT INTO employee (first_name, last_name), VALUES (role_id)'
        );
        console.log(result);
        console.table(result.rows);
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
            name: 'newRole',
            message: 'What is the new role for this employee?'
        },
    ]);

    const { first_name, last_name, newRole } = answers;

    try {
        const employee = await pool.getEmployeeByName(first_name, last_name);
        
        if (employee) {
            employee.role_id = newRole;
            await pool.updateEmployee(employee);
            console.log(`Employee role successfully updated for employee ${first_name} ${last_name} in database!`);
        } else {
            console.log(`Employee ${first_name} ${last_name} not found in database :(`);
        }
    } catch (error) {
        console.error(error);
    }
}

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
        await pool.addRole(answers);
        console.log(`Role ${answers.title} added successfully to database!`);
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

        await pool.addDepartment(answers);
        console.log(`Department ${answers.department_name} added successfully to database!`);
    } catch (error) {
        console.error(error);
    }
}

async function viewAllRoles() {
    try {
        const result = await pool.query(
            'SELECT * FROM roles'
        );
        console.log(result);
        console.table(result.rows)
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
            'SELECT * FROM employee'
        );
        console.log(result);
        console.table(result.rows);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { addDepartment, viewAllDepartments, addRole, viewAllRoles, updateEmployeeRole, addEmployee, viewAllEmployees };