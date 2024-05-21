const inquirer = require('inquirer');
const express = require('express');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

