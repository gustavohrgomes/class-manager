const fs = require('fs');
const data = require('../data.json');
const { date, grade } = require('../utils');

exports.index = (req, res) => {
  const students = data.students.map(student => {
    return { 
      ...student
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
    scholar_year: grade(foundStudent.scholar_year),
    birth: date(foundStudent.birth).birthDay,
  }

  console.log(student);

  return res.render('students/show', { student });
}

exports.create = (req, res) => {
  return res.render('students/create');
}

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, fill in all fields");
    }
  }

  birth = Date.parse(req.body.birth);

  let id = 1;
  const lastStudent = data.students[data.students.length - 1];

  if (lastStudent){
    id = lastStudent.id + 1
  }

  data.students.push({
    id,
    ...req.body,
    birth
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
    birth: date(foundStudent.birth).iso
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