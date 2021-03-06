const fs = require('fs');
const data = require('../data.json');
const { age, graduation, date } = require('../utils');

exports.index = (req, res) => {
  const teachers = data.teachers.map(teacher => {
    return { 
      ...teacher,
      fields: teacher.fields.split(',')
    }
  });

  return res.render('teachers/index', { teachers });
}

exports.show = (req, res) => {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(teacher => {
    return teacher.id == id;
  })

  if (!foundTeacher) return res.send('Teacher not found!')

  const teacher = {
    ...foundTeacher,
    age: age(foundTeacher.birth),
    fields: foundTeacher.fields.split(','),
    graduationLevel: graduation(foundTeacher.graduationLevel),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
  }

  return res.render('teachers/show', { teacher });
}

exports.create = (req, res) => {
  return res.render('teachers/create');
}

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, fill in all fields");
    }
  }

  let { avatar_url, name, birth, graduationLevel, class_type, fields } = req.body;

  birth = Date.parse(birth);
  const id = Number(data.teachers.length + 1);
  const created_at = Date.now();

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    graduationLevel,
    class_type,
    fields,
    created_at
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if (err) return res.send("An error has ocurred during the write file operation");

    return res.redirect('teachers');
  })
}

exports.edit = (req, res) => {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(teacher => {
    return teacher.id == id;
  });

  if (!foundTeacher) return res.send("Teacher not found, sorry :(");

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth)
  }

  return res.render('teachers/edit', { teacher });
}

exports.update = (req, res) => {
  const { id } = req.body;

  let index = 0;

  const foundTeacher = data.teachers.find((teacher, foundIndex) => {
    if (id == teacher.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundTeacher) return res.send("Teacher not found, sorry :(");

  const teacher = {
    ...foundTeacher,
    ...req.body,
    id: Number(req.body.id),
    birth: Date.parse(req.body.birth)
  }

  data.teachers[index] = teacher;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if (err) return res.send('Write Error');

    return res.redirect(`/teachers/${id}`);
  })
}

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredTeachers = data.teachers.filter(teacher => {
    return teacher.id != id;
  });

  data.teachers = filteredTeachers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if (err) return res.send("Write file error!");

    return res.redirect('/teachers');
  });
}