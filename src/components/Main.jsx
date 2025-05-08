import { useEffect, useState } from "react";
import List from "./List";
import NavBar from "./NavBar";
import axios from "axios";
import StudentForm from "./StudentForm";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";

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
  let [view, setView] = useState("home");
  let [selectedStudent, setSelectedStudent] = useState({});
  let [user, setUser] = useState("");
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
    else if (view == "add" || view == "edit") {
      setView("list");
    }
  }
  async function handleFormSubmit(student) {
    let response, s;
    if (view == "add") {
      response = await axios.post("http://localhost:3000/students", student);
      s = response.data;
      // back-end has sent back this student object alng with its id
      // let us modify our student-list now
      let stList = [...studentList];
      stList.push(s);
      setStudentList(stList);
    } //..add
    else if (view == "edit") {
      response = await axios.put(
        "http://localhost:3000/students/" + student.id,
        student
      );
      s = response.data;
      // let us modify our student-list now
      let stList = studentList.map((e, index) => {
        if (e.id == student.id) {
          return student;
        } else {
          return e;
        }
      });
      setStudentList(stList);
    } //else
    setView("list");
  }
  async function handleUserFormSubmit(user) {
    let response, s;
    // Check whether user exists
    // get all users from backend
    response = await axios.get("http://localhost:3000/users");
    let userList = response.data;
    let filteredUserList = userList.filter(
      (e, index) => e.emailid == user.emailid
    );

    if (filteredUserList.length == 1) {
      // this user exists
      setMessage("Sorry....this emailid is already registered");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      response = await axios.post("http://localhost:3000/users", user);
      s = response.data;
      // setMessage("Signup operation successful");
      setView("signupSuccess");
    }
  }
  async function handleLoginFormSubmit(user) {
    let response = await axios.get("http://localhost:3000/users");
    let userList = response.data;
    let filteredUserList = userList.filter(
      (e, index) => e.emailid == user.emailid && e.password == user.password
    );
    if (filteredUserList.length == 1) {
      //login Success
      setView("loginSuccess");
      setUser(filteredUserList[0]);
    } else {
      //login failure
      // setView("loginFailure");
      setMessage("Sorry... wrong credentials");
    }
  }
  function handleEditButtonClick(s) {
    setView("edit");
    setSelectedStudent(s);
  }
  function handleSignupButtonClick() {
    setView("signup");
  }
  function handleHomeButtonClick() {
    setView("home");
  }
  function handleLoginClick() {
    setView("login");
  }
  function handleLogoutClick() {
    setView("home");
    setUser("");  //false
  }
  return (
    <div className="container">
      <NavBar
        message={message}
        user={user}
        onSignupButtonClick={handleSignupButtonClick}
        onHomeButtonClick={handleHomeButtonClick}
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogoutClick}
      />
      {(view == "list" || view == "loginSuccess") && (
        <div className="text-center my-3">
          <button className="btn btn-primary" onClick={handleAddStudentClick}>
            {view == "list" ? "Add a student" : "List"}
          </button>
        </div>
      )}
      {(view == "signup" || view == "signupSuccess") && (
        <SignupPage
          view={view}
          onUserFormSubmit={handleUserFormSubmit}
          onLoginClick={handleLoginClick}
        />
      )}
      {view == "login" && (
        <LoginPage onLoginFormSubmit={handleLoginFormSubmit} />
      )}
      {view == "home" && (
        <div className="my-4">
          <img src="/images/students.jpg" alt="" />
        </div>
      )}
      {(view == "add" || view == "edit") && (
        <StudentForm
          view={view}
          selectedStudent={selectedStudent}
          onFormSubmit={handleFormSubmit}
        />
      )}
      {(view == "list" || view == "loginSuccess") && (
        <List
          studentList={studentList}
          onDeleteButtonClick={handleDeleteButtonClick}
          onEditButtonClick={handleEditButtonClick}
        />
      )}
    </div>
  );
}
