/* Task Description */
/* 
 * Create a module for a Telerik Academy course
 * The course has a title and presentations
 * Each presentation also has a title
 * There is a homework for each presentation
 * There is a set of students listed for the course
 * Each student has firstname, lastname and an ID
 * IDs must be unique integer numbers which are at least 1
 * Each student can submit a homework for each presentation in the course
 * Create method init
 * Accepts a string - course title
 * Accepts an array of strings - presentation titles
 * Throws if there is an invalid title
 * Titles do not start or end with spaces
 * Titles do not have consecutive spaces
 * Titles have at least one character
 * Throws if there are no presentations
 * Create method addStudent which lists a student for the course
 * Accepts a string in the format 'Firstname Lastname'
 * Throws if any of the names are not valid
 * Names start with an upper case letter
 * All other symbols in the name (if any) are lowercase letters
 * Generates a unique student ID and returns it
 * Create method getAllStudents that returns an array of students in the format:
 * {firstname: 'string', lastname: 'string', id: StudentID}
 * Create method submitHomework
 * Accepts studentID and homeworkID
 * homeworkID 1 is for the first presentation
 * homeworkID 2 is for the second one
 * ...
 * Throws if any of the IDs are invalid
 * Create method pushExamResults
 * Accepts an array of items in the format {StudentID: ..., Score: ...}
 * StudentIDs which are not listed get 0 points
 * Throw if there is an invalid StudentID
 * Throw if same StudentID is given more than once ( he tried to cheat (: )
 * Throw if Score is not a number
 * Create method getTopStudents which returns an array of the top 10 performing students
 * Array must be sorted from best to worst
 * If there are less than 10, return them all
 * The final score that is used to calculate the top performing students is done as follows:
 * 75% of the exam result
 * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
 */

function solve() {
  var Course = {
    init: function (title, presentations) {
      validateTitle(title);

      if (presentations.length === 0) {
        throw new Error('Result does not contain any presentations.');
      }

      for (var title of presentations) {
        validateTitle(title);
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

  function validateTitle(title) {
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
  }

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