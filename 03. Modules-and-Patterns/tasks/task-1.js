function solve() {
  var Course = {
    init: function (title, presentations) {
      if (!Boolean(title)) {
        throw new Error('Title must be a non-empty string!');
      }

      if (/[\s]{2,}/.test(title)) {
        throw new Error('Title must not contain consecutive spaces');
      }

      if (/^\s.*$/.test(title)) {
        throw new Error('Title must not start with space');
      }

      if (/.*\s$/.test(title)) {
        throw new Error('Title must not end with space');
      }

      if (presentations.length === 0) {
        throw new Error('Result does not contain any presentations.');
      }

      this.title = title;
      this.presentations = presentations;
      this.students = [];

      return this;
    },
    addStudent: function (name) {
      if (!/^[A-Z].*?\s[A-Z].*?$/.test(name)) {
        throw new Error('Name is not in the correct format!');
      }

      var studentID = this.students.length + 1;
      var names = name.split(' ');
      if (names.length !== 2) {
        throw new Error('Student can\'t have more than 2 names!');
      }

      var student = {
        firstname: names[0],
        lastname: names[1],
        id: studentID,
        homework: [],
        examResult: 0,
        finalScore: 0
      };

      this.students.push(student);
      return studentID;
    },
    getAllStudents: function () {
      return this.students;
    },
    submitHomework: function (studentID, homeworkID) {
      if (!this.students.some(x => studentID === x.id)) {
        throw '';
      }

      if (homeworkID < 1 || homeworkID > this.presentations.length) {
        throw '';
      }

      this.students[this.students.findIndex(stud => stud.id === studentID)].homework.push(homeworkID);
    },
    pushExamResults: function (results) {
      if (!Array.isArray(results)) {
        throw '';
      }

      var ids = [];
      for (var i = 0; i < results.length; i += 1) {
        if (!Number(results[i].StudentID)) {
          throw '';
        }

        if (results[i].StudentID < 1 || results[i].StudentID > this.students.length) {
          throw '';
        }

        if (!Number(results[i].score)) {
          throw '';
        }

        if (ids.indexOf(results[i].StudentID) !== -1) {
          throw '';
        } else {
          ids.push(results[i].StudentID);
        }

        this.students.forEach(function (s) {
          if (s.id === results[i].StudentID) {
            s.examResult = results[i].score;
          }
        })
      }
    },
    getTopStudents: function () {
      this.students.forEach(s => {
        var hwScore = s.homework.length / this.presentations.length;
        s.finalScore = (3 / 4) * s.examResult + (1 / 4) * hwScore;
      });

      this.students.sort(function (a, b) {
        return b.finalScore - a.finalScore;
      });

      if (this.students.length < 10) {
        return this.students;
      }
    }
  };

  return Course;
}

module.exports = solve;

// testing course
// let course = solve().init('js oop', ['lec1', 'lec2', 'lec3', 'lec4']);
// course.addStudent('Pepo Pepov');
// course.addStudent('Koko Kokov');
// course.addStudent('Tsanko Tsankov');
// course.addStudent('Tina Tinkova');
// course.addStudent('Tsetsa Tsetsova');

// course.submitHomework(2, 1);
// course.submitHomework(2, 2);
// course.submitHomework(1, 1);
// course.submitHomework(3, 3);

// course.pushExamResults([{
//   StudentID: 1,
//   score: 5
// }]);
// course.pushExamResults([{
//   StudentID: 2,
//   score: 4
// }]);
// course.pushExamResults([{
//   StudentID: 3,
//   score: 6
// }]);
// course.pushExamResults([{
//   StudentID: 4,
//   score: 4
// }]);
// course.pushExamResults([{
//   StudentID: 5,
//   score: 3
// }]);

// course.getTopStudents();
// console.log(course);