-- DROP DATABASE IF EXISTS academia_edu_ledger;
-- CREATE DATABASE IF NOT EXISTS academia_edu_ledger;
USE academia_edu_ledger;

CREATE TABLE identification_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(6) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(250)
) ENGINE=InnoDB;

CREATE TABLE cities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(14) NOT NULL,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL,
    identification_type_id INT NOT NULL,
    identificationNumber VARCHAR(16) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    birthdate DATETIME NOT NULL,
    email VARCHAR(60),
    address VARCHAR(100),
    city_id BIGINT NOT NULL,

    FOREIGN KEY (identification_type_id) REFERENCES identification_types(id),
    FOREIGN KEY (city_id)REFERENCES cities(id)
) ENGINE=InnoDB;

CREATE TABLE teachers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL,
    identification_type_id INT NOT NULL,
    identificationNumber VARCHAR(16) NOT NULL,
    email VARCHAR(100) NOT NULL,

    FOREIGN KEY (identification_type_id) REFERENCES identification_types(id)
) ENGINE=InnoDB;

CREATE TABLE classrooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL,
    description VARCHAR(250),
    capacity INT NOT NULL,
    active TINYINT NOT NULL
) ENGINE=InnoDB;

CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL,
    description VARCHAR(250),
    intensity INT NOT NULL,
    weight INT NOT NULL,
    active TINYINT NOT NULL
) ENGINE=InnoDB;

CREATE TABLE topics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    code VARCHAR(10) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(250),
    active TINYINT NOT NULL,

    FOREIGN KEY (course_id) REFERENCES courses(id)
) ENGINE=InnoDB;

CREATE TABLE courses_schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    teacher_id BIGINT NOT NULL,
    classroom_id INT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    active TINYINT NOT NULL,

    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id)
) ENGINE=InnoDB;

CREATE TABLE inscriptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_schedule BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    register_date DATETIME NOT NULL,
    active TINYINT NOT NULL,

    FOREIGN KEY (course_schedule) REFERENCES courses_schedules(id),
    FOREIGN KEY (student_id) REFERENCES students(id)
) ENGINE=InnoDB;

CREATE TABLE rates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    inscription_id BIGINT NOT NULL,
    rate BIGINT NOT NULL,
    comments VARCHAR(250),

    FOREIGN KEY (inscription_id) REFERENCES inscriptions(id)
) ENGINE=InnoDB;


-- SELECT * FROM identification_types ORDER BY id DESC;
-- SELECT * FROM cities ORDER BY id DESC;
-- SELECT * FROM students ORDER BY id DESC;
-- SELECT * FROM teachers ORDER BY id DESC;
-- SELECT * FROM classrooms ORDER BY id DESC;
-- SELECT * FROM courses ORDER BY id DESC;
-- SELECT * FROM topics ORDER BY id DESC;
-- SELECT * FROM courses_schedules ORDER BY id DESC;
-- SELECT * FROM inscriptions ORDER BY id DESC;
-- SELECT * FROM rates ORDER BY id DESC;