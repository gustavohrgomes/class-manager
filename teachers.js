const fs = require('fs');
const data = require('./data.json');
const { age } = require('./utils');

exports.show = (req, res) => {
   const { id } = req.params;

   const foundTeacher = data.teachers.find(teacher => {
      return teacher.Id == id;
   })

   if(!foundTeacher) return res.send('Teacher not found!')

   const teacher = {
      ...foundTeacher,
      age: age(foundTeacher.birth),
      fields: foundTeacher.fields.split(','),
      created_at: "",
   }

   return res.render('teachers/show', { teacher });
}

exports.post = (req, res) => {
   const keys = Object.keys(req.body);

   for (key of keys) {
     if(req.body[key] == ""){
        return res.send("Please, fill in all fields");
     }
   }

   let { avatar_url, name,  birth, educational_level, class_type, fields} = req.body;

   birth = Date.parse(birth);
   const Id = Number(data.teachers.length + 1);
   const created_at = Date.now();

   data.teachers.push({
      Id,
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

      return res.redirect('teachers');
   })
}