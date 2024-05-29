DROP DATABASE IF EXISTS store_db;
CREATE DATABASE store_db;


CREATE TABLE department (
id SERIAL PRIMARY KEY,
department_name VARCHAR(30) UNIQUE NOT NULL
);
-- foreign keys activity 
CREATE TABLE roles (
id SERIAL PRIMARY KEY,
title VARCHAR(30) UNIQUE NOT NULL,
salary DECIMAL NOT NULL,
department_id INTEGER NOT NULL,
);
-- foreign keys activity 
CREATE TABLE employee (
id SERIAL PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER NOT NULL,
manager_id INTEGER 
);