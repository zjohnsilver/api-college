CREATE SCHEMA IF NOT EXISTS manage;

-- Student Table
CREATE TABLE manage.student (
    matriculation_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    birth_day TIMESTAMPTZ NOT NULL,
    started_in TIMESTAMPTZ DEFAULT NOW()
);

-- Teacher Table
CREATE TABLE manage.teacher (
    matriculation_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    birth_day TIMESTAMPTZ NOT NULL
);

-- Course Table
CREATE TABLE manage.course (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    tag TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Student-Course Enrollment Table
CREATE TABLE manage.student_course (
    id SERIAL PRIMARY KEY,
    student_matriculation_id TEXT NOT NULL,
    course_id INTEGER NOT NULL,
    enrollment_date TIMESTAMPTZ DEFAULT NOW(),

    FOREIGN KEY (student_matriculation_id)
        REFERENCES manage.student (matriculation_id)
        ON DELETE CASCADE,
    FOREIGN KEY (course_id)
        REFERENCES manage.course (id)
        ON DELETE CASCADE,

    UNIQUE (student_matriculation_id, course_id)
);

-- Subject Table
CREATE TABLE manage.subject (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    tag TEXT NOT NULL UNIQUE,
    optional BOOLEAN DEFAULT FALSE
);

-- Class Table
CREATE TABLE manage.class (
    id SERIAL PRIMARY KEY,
    student_matriculation_id TEXT NOT NULL,
    teacher_matriculation_id TEXT NOT NULL,
    subject_id INTEGER NOT NULL,

    FOREIGN KEY (student_matriculation_id)
        REFERENCES manage.student (matriculation_id)
        ON DELETE CASCADE,
    FOREIGN KEY (teacher_matriculation_id)
        REFERENCES manage.teacher (matriculation_id)
        ON DELETE SET NULL,
    FOREIGN KEY (subject_id)
        REFERENCES manage.subject (id)
        ON DELETE CASCADE,

    UNIQUE(student_matriculation_id, teacher_matriculation_id, subject_id)
);

-- Teacher-Subject Assignment Table
CREATE TABLE manage.teacher_subject (
    id SERIAL PRIMARY KEY,
    teacher_matriculation_id TEXT NOT NULL,
    subject_id INTEGER NOT NULL,

    FOREIGN KEY (subject_id)
        REFERENCES manage.subject (id)
        ON DELETE CASCADE,
    FOREIGN KEY (teacher_matriculation_id)
        REFERENCES manage.teacher (matriculation_id)
        ON DELETE CASCADE,

    UNIQUE (teacher_matriculation_id, subject_id)
);

-- Course-Teacher Table
CREATE TABLE manage.course_teacher (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL,
    teacher_matriculation_id TEXT NOT NULL,

    FOREIGN KEY (teacher_matriculation_id)
        REFERENCES manage.teacher (matriculation_id)
        ON DELETE CASCADE,
    FOREIGN KEY (course_id)
        REFERENCES manage.course (id)
        ON DELETE CASCADE,

    UNIQUE (course_id, teacher_matriculation_id)
);

-- Course-Subject Association Table
CREATE TABLE manage.course_subject (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    semester INTEGER NOT NULL,
    workload INTEGER NOT NULL,

    FOREIGN KEY (course_id)
        REFERENCES manage.course (id)
        ON DELETE CASCADE,
    FOREIGN KEY (subject_id)
        REFERENCES manage.subject (id)
        ON DELETE CASCADE,

    UNIQUE (course_id, subject_id)
);

-- Student Academic History Table
CREATE TABLE manage.historic (
    id SERIAL PRIMARY KEY,
    student_matriculation_id TEXT NOT NULL,
    subject_id INTEGER NOT NULL,
    teacher_matriculation_id TEXT NOT NULL,
    grade FLOAT CHECK (grade >= 0 AND grade <= 10),
    approved BOOLEAN,
    attendance INTEGER CHECK (attendance >= 0 AND attendance <= 100),
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,

    FOREIGN KEY (teacher_matriculation_id)
        REFERENCES manage.teacher (matriculation_id)
        ON DELETE SET NULL,
    FOREIGN KEY (student_matriculation_id)
        REFERENCES manage.student (matriculation_id)
        ON DELETE CASCADE,
    FOREIGN KEY (subject_id)
        REFERENCES manage.subject (id)
        ON DELETE SET NULL,

    UNIQUE (student_matriculation_id, subject_id, start_time)
);

-- Prerequisites Table
CREATE TABLE manage.prerequisites (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER NOT NULL,
    prerequisite_id INTEGER NOT NULL,

    FOREIGN KEY (subject_id)
        REFERENCES manage.subject (id)
        ON DELETE CASCADE,
    FOREIGN KEY (prerequisite_id)
        REFERENCES manage.subject (id)
        ON DELETE CASCADE,

    UNIQUE (subject_id, prerequisite_id)
);
