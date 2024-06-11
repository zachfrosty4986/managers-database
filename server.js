// Import the required modules
const inquirer = require('inquirer'); // For user prompts
// Import functions from 'functions' module
const { addDepartment, viewAllDepartments, addRole, viewAllRoles, updateEmployeeRole, addEmployee, viewAllEmployees } = require('./functions');

// Define a list of questions for the user
const questions = [
    {
        type: 'list', // Type of prompt
        name: 'departmentList', // Name of the answer object
        message: 'What would you like to do?:', // Message to display to the user
        choices: [ // List of choices
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ],
    }
]

// Initialize the application
function init() {
    // Prompt the user with the defined questions
    inquirer.prompt(questions).then((answers) => {
        // Check which choice was selected and call the corresponding function
        if (answers.departmentList === "View All Departments") {
            viewAllDepartments();
        }
        if (answers.departmentList === "View All Roles") {
            viewAllRoles();
        }
        if (answers.departmentList === "Add Department") {
            addDepartment();
        }
        if (answers.departmentList === "View All Employees") {
            viewAllEmployees();
        }
        if (answers.departmentList === "Add Employee") {
            addEmployee();
        }
        if (answers.departmentList === "Update Employee Role") {
            updateEmployeeRole();
        }
        if (answers.departmentList === "Add Role") {
            addRole();
        }
        // Exit the program if the user chooses to quit
        if (answers.departmentList === "Quit") {
            console.log("Returning to main terminal...");
        }
    })
};

// Start the application
init();