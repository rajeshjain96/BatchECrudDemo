import { useEffect, useState } from "react";
import List from "./List";
import NavBar from "./NavBar";
import axios from "axios";
import StudentForm from "./StudentForm";

export default function Main() {
  //   let sList = [
  //     { id: 1, rollno: 10, name: "Sachin", marks: 78.5 },
  //     { id: 2, rollno: 11, name: "Saurav", marks: 48.5 },
  //     { id: 3, rollno: 12, name: "Rahul", marks: 71.5 },
  //     { id: 4, rollno: 15, name: "Kapil", marks: 58.2 },
  //     { id: 5, rollno: 18, name: "Sunil", marks: 38.0 },
  //   ];
  let [studentList, setStudentList] = useState([]);
  let [message, setMessage] = useState("");
  let [view, setView] = useState("list");
  // As soon as this component is rendered, get data from backend server (json-server)
  useEffect(() => {
    // get data from backend
    getDataFromServer();
  }, []);
  async function getDataFromServer() {
    let response = await axios.get("http://localhost:3000/students");
    let list = response.data;
    console.log(list);
    setStudentList(list);
  }
  function handleDeleteButtonClick(s, ans) {
    if (ans) {
      // Delete this particular student from backend
      deleteFromBackend(s);
    } //... yes
  }
  async function deleteFromBackend(s) {
    await axios.delete("http://localhost:3000/students/" + s.id);
    setMessage("Delete operation successful!");
    window.setTimeout(() => {
      setMessage("");
    }, 3000);
    // delete from front end also (studentList)
    let stList = studentList.filter((e, index) => e.id != s.id);
    setStudentList(stList);
  }
  function handleAddStudentClick() {
    if (view == "list") setView("add");
    else if (view == "add") {
      setView("list");
    }
  }
  async function handleFormSubmit(student) {
    let response = await axios.post("http://localhost:3000/students", student);
    let s = response.data;
    // back-end has sent back this student object alng with its id
    // let us modify our student-list now
    let stList = [...studentList];
    stList.push(s);
    setStudentList(stList);
    setView("list")
  }
  return (
    <div className="container">
      <NavBar message={message} />
      <div className="text-center my-3">
        <button className="btn btn-primary" onClick={handleAddStudentClick}>
          {view == "list" ? "Add a student" : "List"}
        </button>
      </div>
      {view == "add" && <StudentForm onFormSubmit={handleFormSubmit} />}
      {view == "list" && (
        <List
          studentList={studentList}
          onDeleteButtonClick={handleDeleteButtonClick}
        />
      )}
    </div>
  );
}
