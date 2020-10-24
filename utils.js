module.exports = {
   age: timeStamp => {
      const today = new Date();
      const birthDate = new Date(timeStamp);

      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();

      if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
         age = age - 1;
      }

      return age;
   },

   date: timeStamp => {
      const date = new Date(timeStamp);

      const year = date.getUTCFullYear();
      const month = `0${date.getUTCMonth() + 1}`.slice(-2);
      const day = `0${date.getUTCDate()}`.slice(-2);

      return {
         day: day,
         month: month,
         year: year,
         iso: `${year}-${month}-${day}`,
         birthDay: `${day}/${month}`
      }
   },

   graduation: graduation => {

      const graduationLevels = {
         Doctor() {
            return "Doutorado";
         },
         Master() {
            return "Mestrado";
         },
         College() {
            return "Ensino Superior";
         },
         HighSchool() {
            return "Ensino médio completo";
         }
      }

      const teacherLevel = graduationLevels[graduation];

      return teacherLevel();
   },

   grade: grade => {
      const grades = {
         FirstHighGrade() {
            return "1° ano do colegial"
         },
         SecondHighGrade() {
            return "2° ano do colegial"
         },
         ThirdHighGrade() {
            return "3° ano do colegial"
         },
         FifthMidGrade() {
            return "5° ano do fundamental"
         },
         SixthMidGrade() {
            return "6° ano do fundamental"
         },
         SeventhMidGrade() {
            return "7° ano do fundamental"
         },
         EigthMidGrade() {
            return "8° ano do fundamental"
         },
         NinethMidGrade() {
            return "9° ano do fundamental"
         }
      }

      const studentGrade = grades[grade];

      return studentGrade();
   }
}