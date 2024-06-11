// Import required modules
const inquirer = require("inquirer"); // For user prompts
const { Pool } = require('pg'); // For PostgreSQL database interaction
require("dotenv").config(); // For loading environment variables

// Create a new pool instance for PostgreSQL database connection using environment variables
const pool = new Pool(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: 'localhost',
        database: process.env.DB_NAME,
    },
    console.log(`Connected to the store_db Database!`) // Log a message on successful connection
);

// Function to add a new employee
async function addEmployee() {
    // Prompt user for employee details
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

    // Destructure the answers object
    const { first_name, last_name, role_id } = answers;

    try {
        // Insert the new employee into the database
        const result = await pool.query(
            'INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)',
            [first_name, last_name, role_id]
        );
        console.log("New Employee Successfully Added!");
    } catch (error) {
        console.error(error); // Log any errors
    }
}

// Function to update an employee's role
async function updateEmployeeRole() {
    // Prompt user for employee details and new role ID
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

    // Destructure the answers object
    const { first_name, last_name, role_id } = answers;

    try {
        // Update the employee's role in the database
        const result = await pool.query(
            'INSERT INTO employee (first_name, last_name, role_id) VALUES ($1, $2, $3)',
            [first_name, last_name, role_id]
        );
        console.log(`New Role successfully updated for ${first_name} ${last_name}!`);
    } catch (error) {
        console.error(error); // Log any errors
    }
}

// Function to add a new role
async function addRole() {
    // Prompt user for role details
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

        // Destructure the answers object
        const { title, salary, department_id } = answers;

        // Insert the new role into the database
        const result = await pool.query(
            'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)',
            [title, salary, department_id]
        );
        console.log("New Role Successfully Added!");
    } catch (error) {
        console.error(error); // Log any errors
    }
}

// Function to add a new department
async function addDepartment() {
    try {
        // Prompt user for department name
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'department_name',
                message: "What is the name of your new department?",
            }
        ]);

        const departmentName = answers.department_name;

        try {
            // Insert the new department into the database
            const result = await pool.query(
                'INSERT INTO department (department_name) VALUES ($1)',
                [departmentName]
            );
            console.log("New Department Successfully Added!");
        } catch (error) {
            console.error(error); // Log any errors
        }
    } catch (error) {
        console.error(error); // Log any errors
    }
}

// Function to view all roles
async function viewAllRoles() {
    try {
        // Query the database for all roles and their associated department names
        const result = await pool.query(
            'SELECT title, salary, department_name FROM roles JOIN department ON department.id = roles.department_id'
        );
        console.table(result.rows); // Display the results in a table format
    } catch (error) {
        console.error(error); // Log any errors
    }
}

// Function to view all departments
async function viewAllDepartments() {
    try {
        // Query the database for all departments
        const result = await pool.query(
            'SELECT * FROM department'
        );
        console.log(result); // Log the result object
        console.table(result.rows); // Display the results in a table format
    } catch (error) {
        console.error(error); // Log any errors
    }
}

// Function to view all employees
async function viewAllEmployees() {
    try {
        // Query the database for all employees and their associated roles and department names
        const result = await pool.query(
            `SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.department_name, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
             FROM employee
             JOIN roles ON employee.role_id = roles.id
             JOIN department ON department.id = roles.department_id
             LEFT JOIN employee AS manager ON manager.id = employee.manager_id;
             `
        );
        console.table(result.rows); // Display the results in a table format
    } catch (error) {
        console.error(error); // Log any errors
    }
}

// Export the functions for use in other modules
module.exports = { addDepartment, viewAllDepartments, addRole, viewAllRoles, updateEmployeeRole, addEmployee, viewAllEmployees };
