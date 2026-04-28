CREATE DATABASE erp_system;
USE erp_system;

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    registration_no VARCHAR(20) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    gender VARCHAR(10),
    dob DATE,
    email VARCHAR(100),
    phone VARCHAR(15),
    course VARCHAR(50),
    department VARCHAR(50),
    year INT,
    semester INT,
    admission_status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admissions (
    admission_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    admission_date DATE,
    approved_by INT,
    status VARCHAR(20),

    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

CREATE TABLE fees (
    fee_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    amount DECIMAL(10,2),
    payment_date DATE,
    payment_status VARCHAR(20),

    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

CREATE TABLE hostel_allocation (
    hostel_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    room_number VARCHAR(10),
    block VARCHAR(10),
    allocation_date DATE,
    status VARCHAR(20),

    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

CREATE TABLE library_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    book_name VARCHAR(100),
    issue_date DATE,
    return_date DATE,
    status VARCHAR(20),

    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

CREATE TABLE exam_registration (
    exam_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    exam_name VARCHAR(100),
    registration_date DATE,
    status VARCHAR(20),

    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('ADMIN','WARDEN','ACCOUNTANT','LIBRARIAN','STUDENT'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

