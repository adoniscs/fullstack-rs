create table students (
    id integer primary key autoincrement,
    name text not null
);

create table courses (
    id integer primary key autoincrement,
    name text not null
);

create table addresses (
    id integer primary key autoincrement,
    street text not null,
    city text not null
);

-- popular dados para tabela students

-- relacionamento 1:1 (um para um)
-- um aluno possui um endereço, e um endereço pertence a um aluno
create table student_address (
    id integer primary key autoincrement,
    student_id integer unique not null,
    street text not null,
    city text not null,
    foreign key (student_id) references students (id)
);

-- relacionamento 1:n (um para muitos)
-- um curso tem muito módulos
create table course_modules (
    id integer primary key autoincrement,
    course_id integer not null,
    name text not null,
    foreign key (course_id) references courses (id)
)

/*
relacionamento n:m (muitos para muitos)
students: 1 aluno pade fazer muitos cursos
course: 1 curso pode ter muitos alunos
*/
create table students_courses (
    id integer primary key autoincrement,
    student_id integer not null,
    course_id integer not null,
    foreign key (student_id) references students (id),
    foreign key (course_id) references courses (id)
);

-- populando dados
insert into
    students_courses (student_id, course_id)
values (1, 1);

-- select
select sc.id, sc.student_id, s.name as aluno, sc.course_id, c.name as curso
from
    students_courses as sc
    join students as s on s.id = sc.student_id
    join courses as c on c.id = sc.course_id;

SELECT
    a.id,
    a.student_id,
    s.name AS nome_completo,
    a.street AS rua,
    a.city AS cidade
FROM
    student_address AS a
    JOIN students AS s ON s.id = a.student_id;