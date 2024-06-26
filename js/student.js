import { ENDPOINT } from "./constants.js"

export default class Student {  
    constructor(name, age, note){
        this.name=  name;
        this.age = age;
        this.note = note;
    }

    static allStudents = async function() {
        const response = await fetch(ENDPOINT)
        const students = await response.json()
        return students;
    }

    addStudent = async function() {
      const response = await fetch(ENDPOINT, {

        method: "POST",
        body: JSON.stringify({
          name: this.name,
          age : this.age,
          note: this.note

        })
      });
      console.log(response);
      return response;
  }
    
}