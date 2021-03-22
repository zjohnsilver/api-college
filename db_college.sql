CREATE SCHEMA manage;

-- DROP TABLE manage.student;

CREATE TABLE manage."student" (
	"matriculation" bigint PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"birth_day" timestamptz NOT NULL,
	"started_in" timestamptz NULL
);

CREATE SEQUENCE manage.student_id_seq;
ALTER TABLE manage.student ALTER COLUMN matriculation SET NOT NULL;
ALTER TABLE manage.student ALTER COLUMN matriculation SET DEFAULT nextval('student_id_seq');
ALTER SEQUENCE student_id_seq OWNED BY student.matriculation ;
ALTER SEQUENCE student_id_seq RESTART 20210000000000;

-- DROP TABLE manage.teacher;

CREATE TABLE manage.teacher (
	"matriculation" bigint PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"birth_day" timestamptz NOT NULL
);

-- DROP TABLE manage.course;

CREATE TABLE manage."course" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"tag" text NOT NULL UNIQUE,
	"created_at" timestamptz NOT NULL DEFAULT NOW()
);

-- DROP TABLE manage.student_course;

CREATE TABLE manage."student_course" (
	"id" SERIAL PRIMARY KEY,
	"student_matriculation" BIGINT NOT NULL,
	"course_id" integer NOT NULL,

	FOREIGN KEY (student_matriculation)
        REFERENCES manage.student (matriculation)
          ON DELETE CASCADE,
    FOREIGN KEY (course_id)
        REFERENCES manage.course (id)
          ON DELETE CASCADE
);

-- DROP TABLE manage.subject;

CREATE TABLE manage."subject" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"tag" TEXT NOT NULL UNIQUE,
	"optional" BOOLEAN DEFAULT false
);

-- DROP TABLE manage.class;

CREATE TABLE manage."class" (
	"id" SERIAL PRIMARY KEY,
	"student_matriculation" BIGINT NOT NULL,
	"teacher_matriculation" BIGINT NOT NULL,
	"subject_id" INTEGER NOT NULL,

	FOREIGN KEY (student_matriculation)
        REFERENCES manage.student (matriculation)
            ON DELETE CASCADE,
    FOREIGN KEY (teacher_matriculation)
        REFERENCES manage.teacher (matriculation)
            ON DELETE SET NULL,
    FOREIGN KEY (subject_id)
        REFERENCES manage.subject (id)
            ON DELETE CASCADE,

    UNIQUE(student_matriculation, teacher_matriculation, subject_id)
);

-- DROP TABLE manage.teacher_subject;

CREATE TABLE manage."teacher_subject" (
	"id" SERIAL PRIMARY KEY,
	"teacher_matriculation" BIGINT NOT NULL,
	"subject_id" INTEGER NOT NULL,

	FOREIGN KEY (subject_id)
        REFERENCES manage.subject (id)
            ON DELETE CASCADE,
    FOREIGN KEY (teacher_matriculation)
        REFERENCES manage.teacher (matriculation)
            ON DELETE CASCADE,

    UNIQUE (teacher_matriculation, subject_id)
);


-- DROP TABLE manage.course_teacher;

CREATE TABLE manage."course_teacher"(
	"id" SERIAL PRIMARY KEY,
	"course_id" INTEGER NOT NULL,
	"teacher_matriculation" BIGINT NOT NULL,

	FOREIGN KEY (teacher_matriculation)
        REFERENCES manage.teacher (matriculation)
            ON DELETE CASCADE,
    FOREIGN KEY (course_id)
        REFERENCES  manage.course (id)
            ON DELETE CASCADE,
    
    UNIQUE (course_id, teacher_matriculation)
);

CREATE TABLE manage."course_subject" (
	"id" SERIAL PRIMARY KEY,
	"course_id" INTEGER NOT NULL,
	"subject_id" INTEGER NOT NULL,
	"semester" INTEGER NOT NULL,

    FOREIGN KEY (course_id)
        REFERENCES  manage.course (id)
            ON DELETE CASCADE,
	FOREIGN KEY (subject_id)
        REFERENCES manage.subject (id)
            ON DELETE CASCADE,

    UNIQUE (course_id, subject_id)
);

CREATE TABLE manage."historic" (
	"id" SERIAL PRIMARY KEY,
	"student_matriculation" BIGINT NOT NULL,
	"subject_id" integer NOT NULL,
	"teacher_matriculation" BIGINT NOT NULL,
	"note" float,
	"approved" BOOLEAN,
	"frequency" integer,
	"start_time" timestamptz NOT NULL,
	"end_time" timestamptz,

	FOREIGN KEY (teacher_matriculation)
        REFERENCES manage.teacher (matriculation)
            ON DELETE SET NULL,
	FOREIGN KEY (student_matriculation)
        REFERENCES manage.student (matriculation)
            ON DELETE CASCADE,
    FOREIGN KEY (subject_id)
        REFERENCES manage.subject (id)
            ON DELETE SET NULL,

    UNIQUE (student_matriculation, subject_id, approved)
)


CREATE TABLE manage."prerequisites" (
	"id" serial PRIMARY KEY,
	"subject_id" integer NOT NULL,
	"prerequisite_id" integer NOT NULL,
    FOREIGN KEY (subject_id)
        REFERENCES manage.subject (id)
            ON DELETE SET NULL,

    UNIQUE (subject_id, prerequisite_id)
)