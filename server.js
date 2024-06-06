const inquirer = require('inquirer');
const {addDepartment, viewAllDepartments, addRole, viewAllRoles, updateEmployeeRole, addEmployee, viewAllEmployees} = require('./functions');

const questions = [
    {
        type: 'list',
        name: 'departmentList',
        message: 'What would you like to do?:',
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
    }
]


function init() {
    inquirer.prompt(questions).then((answers) => {
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
        if (answers.departmentList === "Quit") {
            console.log("Returning to main terminal...")
        }
    })
};

init();

