import { ENDPOINT } from "./constants.js";

export default class Student {

  
  constructor(name, age, note) {
    this.name = name;
    this.age = age;
    this.note = note;
  }
  getAge = () => new Date().getFullYear() - new Date(this.age).getFullYear();

  static allStudents = async function () {
    const response = await fetch(ENDPOINT);
    const students = await response.json();
    return students;
  };

  addStudent = async function () {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.name,
        date: this.age,
        note: this.note,
      }),
    });
    console.log(response);
    return response;
  };

  static deleteStudent = async function (id) {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };
}
