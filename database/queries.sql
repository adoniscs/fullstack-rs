CREATE TABLE students (
  id integer PRIMARY KEY AUTOINCREMENT,
  name text NOT NULL
);


CREATE TABLE courses (
  id integer PRIMARY KEY AUTOINCREMENT,
  name text NOT NULL
);


CREATE TABLE addresses (
  id integer PRIMARY KEY AUTOINCREMENT,
  street text NOT NULL,
  city text NOT NULL
);


-- popular dados para tabela students
INSERT INTO
  students (name)
VALUES
  ('Lucas Santos'),
  ('Maria Silva'),
  ('João Oliveira '),
  ('Ana Costa'),
  ('Pedro Almeida'),
  ('Carla Pereira'),
  ('Rafael Souza'),
  ('Fernanda Lima'),
  ('Bruno Rodrigues'),
  ('Juliana Ferreira');


-- popular dados para tabela courses
INSERT INTO
  courses (name)
VALUES
  ('CSS'),
  ('HTML'),
  ('JavaScript'),
  ('Python'),
  ('Java'),
  ('C#'),
  ('Ruby'),
  ('PHP'),
  ('Swift'),
  ('Kotlin');


-- relacionamento 1:1 (um para um)
-- um aluno possui um endereço, e um endereço pertence a um aluno
CREATE TABLE student_address (
  id integer PRIMARY KEY AUTOINCREMENT,
  student_id integer UNIQUE NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students (id)
);


-- populando dados para tabela student_address
INSERT INTO
  student_address (student_id, street, city)
VALUES
  (1, 'Rua A', 'São Paulo'),
  (2, 'Rua B', 'Rio de Janeiro');


-- relacionamento 1:n (um para muitos)
-- um curso tem muito módulos
CREATE TABLE course_modules (
  id integer PRIMARY KEY AUTOINCREMENT,
  course_id integer NOT NULL,
  name text NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses (id)
);


-- populando dados para tabela course_modules
INSERT INTO
  course_modules (course_id, name)
VALUES
  (1, 'Módulo 1 - Introdução ao CSS'),
  (1, 'Módulo 2 - Seletores e Propriedades'),
  (1, 'Módulo 3 - Layouts e Responsividade');


INSERT INTO
  course_modules (course_id, name)
VALUES
  (2, 'Módulo 1 - Introdução ao HTML'),
  (2, 'Módulo 2 - Estrutura de Documentos'),
  (2, 'Módulo 3 - Formulários e Semântica');


/*
relacionamento n:m (muitos para muitos)
students: 1 aluno pade fazer muitos cursos
course: 1 curso pode ter muitos alunos
*/
CREATE TABLE students_courses (
  id integer PRIMARY KEY AUTOINCREMENT,
  student_id integer NOT NULL,
  course_id integer NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students (id),
  FOREIGN KEY (course_id) REFERENCES courses (id)
);


-- populando dados para tabela students_courses
INSERT INTO
  students_courses (student_id, course_id)
VALUES
  (1, 1);

INSERT INTO
  students_courses (student_id, course_id)
VALUES
  (1, 2);

INSERT INTO
  students_courses (student_id, course_id)
VALUES
  (4, 1);