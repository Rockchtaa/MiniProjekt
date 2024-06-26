import Student from "./student.js";


const DisplayAllStudents = async function() {
    return Student.allStudents().then(function(response){
        return response.map((student ) => {
            const { id, name, date, note } = student;
            return `
                <tr>
                    <td>${name}</td>
                    <td>${date}</td>
                    <td>${note}</td>
                    <td>${id}</td>
                    <td><button class="btn btn-danger btn-sm">Delete</button></td>
                </tr>
            `
        })

    })
}

const addStudents = function(event) {
    event.preventDefault();
    const [name, date, note ] = document.querySelectorAll("#name, #date, #note")
    const stundent = new Student(name.value, date.value, note.value);
    console.log(name.value, date.value, note.value);
    stundent.addStudent();
}


//display the data in HTML
const renderStudents = function() {

    const body = document.querySelector(".stundets-list");
    DisplayAllStudents().then(function(data){
        data = data.join(' ');
        body.innerHTML = data;
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
        addStudents(event);
  })
}

init();
renderStudents();