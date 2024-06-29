import Student from "./student.js";


const DisplayAllStudents = async function() {
  return Student.allStudents().then(function(response) {
      // Daten sortieren
      const sortedData = response.sort((a, b) => b.note - a.note);

      return sortedData.map((data) => {
          const { id, name, date, note } = data;
          const student = new Student(name, date, note);
          return `
              <tr>
                  <td>${id}</td>
                  <td>${student.name}</td>
                  <td>${student.getAge()}</td>
                  <td>${student.note}</td>
                  <td><button class="btn btn-danger btn-sm delete" data-id="${id}">Delete</button></td>
              </tr>
          `;
      });
  });
}

const addStudent = function(event) {
    event.preventDefault();
    const [name, date, note ] = document.querySelectorAll("#name, #date, #note")
    const student = new Student(name.value, date.value, note.value);
    student.addStudent()
}

const deleteStudent = function(event) {
  const id = event.target.getAttribute('data-id');
  console.log(id);
  if (id) {
      Student.deleteStudent(id).then(() => {
          renderStudents();
      }).catch(error => {
          console.error('Error deleting student:', error);
      });
  }
}



//display the data in HTML
const renderStudents = function() {
  const body = document.querySelector(".stundets-list");
  DisplayAllStudents().then(function(data) {
      if (data) {
          body.innerHTML = data.join(' ');
          body.querySelectorAll('.delete').forEach(button => {
              button.addEventListener('click', deleteStudent);
          });
      }
  });
}


// refresh button 
const init = function(){
    const refreshButton = document.querySelector("#refresh");
    const addButton = document.querySelector("#add");


    refreshButton.addEventListener("click", () => {
        renderStudents();
    })
    addButton.addEventListener("click", (event) => {
        addStudent(event);
    })

}

init();
renderStudents();