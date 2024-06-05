const inquirer = require('inquirer');
const { Pool } = require('pg');
const {addDepartment, viewAllDepartments, addRole, viewAllRoles, updateEmployeeRole, addEmployee} = require('./functions');
require("dotenv").config()

const pool = new Pool(
    {
        user: 'postgres',
        password: process.env.DB_PASSWORD,
        host: 'localhost',
        database: 'store_db'
    },
    console.log(`Connected to the store_db Database!`)
)

const questions = [
    {
        type: 'list',
        name: 'departmentList',
        message: 'What would you like to do?:',
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
    }
]

pool.connect();

function init() {
    inquirer.prompt(questions).then((answers) => {
        if (answers.departmentList === "View All Departments") {
            viewAllDepartments(pool, init);
        } 
        if (answers.departmentList === "View All Roles") {
            viewAllRoles(pool, init);
        }
        if (answers.departmentList === "Add Department") {
            addDepartment(pool, init);
        }
    })
};

init();

