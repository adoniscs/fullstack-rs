select * from course_modules;

SELECT
  sc.id,
  sc.student_id,
  s.name AS aluno,
  sc.course_id,
  c.name AS curso
FROM
  students_courses AS sc
  JOIN students AS s ON s.id = sc.student_id
  JOIN courses AS c ON c.id = sc.course_id;


SELECT
  a.id,
  a.student_id,
  s.name AS nome_completo,
  a.street AS rua,
  a.city AS cidade
FROM
  student_address AS a
  JOIN students AS s ON s.id = a.student_id;