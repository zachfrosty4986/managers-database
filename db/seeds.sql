INSERT INTO department (department_name)
VALUES ('Engineering'), 
       ('Marketing'),
       ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES ('Software Engineer', 90000, 1),
       ('Marketing Manager', 75000, 2),
       ('HR Specialist', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('John', 'Doe', 1),
       ('Jane', 'Smith', 3),
       ('Michael', 'Johnson', 2);
