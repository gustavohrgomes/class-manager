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

   graduation: graduation => {

      const graduationLevels = {
         Doctor(){
            return "Doutorado";
         },
         Master(){
            return "Mestrado";
         },
         Collage(){
            return "Ensino Superior";
         },
         HighSchool(){
            return "Ensino médio completo";
         }
      }
      
      const teacherLevel = graduationLevels[graduation];

      return teacherLevel()
   }
}