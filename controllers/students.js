const fs = require('fs');
const data = require('../data.json');
const { age, graduation, date } = require('../utils');

exports.index = (req, res) => {
  const students = data.students.map(student => {
    return { 
      ...student,
      fields: student.fields.split(',')
    }
  });

  return res.render('students/index', { students });
}

exports.show = (req, res) => {
  const { id } = req.params;

  const foundStudent = data.students.find(student => {
    return student.id == id;
  })

  if (!foundStudent) return res.send('Student not found!')

  const student = {
    ...foundStudent,
    age: age(foundStudent.birth),
    fields: foundStudent.fields.split(','),
    educational_level: graduation(foundStudent.educational_level),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at)
  }

  console.log(student);

  return res.render('students/show', { student });
}

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, fill in all fields");
    }
  }

  let { avatar_url, name, birth, educational_level, class_type, fields } = req.body;

  birth = Date.parse(birth);
  const id = Number(data.students.length + 1);
  const created_at = Date.now();

  data.students.push({
    id,
    avatar_url,
    name,
    birth,
    educational_level,
    class_type,
    fields,
    created_at
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if (err) return res.send("An error has ocurred during the write file operation");

    return res.redirect('students');
  })
}

exports.edit = (req, res) => {
  const { id } = req.params;

  const foundStudent = data.students.find(student => {
    return student.id == id;
  });

  if (!foundStudent) return res.send("Student not found, sorry :(");

  const student = {
    ...foundStudent,
    birth: date(foundStudent.birth),
    educational_level: graduation(foundStudent.educational_level)
  }

  return res.render('students/edit', { student });
}

exports.update = (req, res) => {
  const { id } = req.body;

  let index = 0;

  const foundStudent = data.students.find((student, foundIndex) => {
    if (id == student.id) {
      index = foundIndex;
      return true;
    }
  });

  console.log(foundStudent)

  if (!foundStudent) return res.send("Student not found, sorry :(");

  const student = {
    ...foundStudent,
    ...req.body,
    id: Number(req.body.id),
    birth: Date.parse(req.body.birth)
  }

  data.students[index] = student;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if (err) return res.send('Write Error');

    return res.redirect(`/students/${id}`);
  })
}

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredStudents = data.students.filter(student => {
    return student.id != id;
  });

  data.students = filteredStudents;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if (err) return res.send("Write file error!");

    return res.redirect('/students');
  });
}