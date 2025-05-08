import { useEffect, useState } from "react";

export default function StudentForm(props) {
  let {view}=props;
  let [student, setStudent] = useState({});
  useEffect(()=>{
    // This Hook gets called only once (during first rendering of the component)
    if(view=="add")
    {

    }
    else if(view=="edit")
    {
      setStudent(props.selectedStudent);
    }
  },[]);
  function handleTextChange(event) {
    // console.log(event.target.name);
    // console.log(event.target.value);
    let obj = { ...student };
    obj[event.target.name] = event.target.value;
    setStudent(obj);
  }
  function handleFormSubmit(event) {
    event.preventDefault(); // do not refresh
    props.onFormSubmit(student);
  }
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="row w-75 mx-auto bg-primary my-5 p-3">
        <div className="col-6 text-end my-2">Enter Rollno: </div>
        <div className="col-6 text-start my-2">
          <input
            type="text"
            size="40"
            name="rollno"
            value={student.rollno}
            onChange={handleTextChange}
          />{" "}
        </div>
        <div className="col-6 text-end my-2">Enter Name: </div>
        <div className="col-6 text-start my-2">
          <input
            type="text"
            size="40"
            name="name"
            value={student.name}
            onChange={handleTextChange}
          />{" "}
        </div>
        <div className="col-6 text-end my-2">Enter Marks: </div>
        <div className="col-6 text-start my-2">
          <input
            type="text"
            size="40"
            name="marks"
            value={student.marks}
            onChange={handleTextChange}
          />{" "}
        </div>
        <div className="my-3">
          <button type="submit">{view=="add"?"Add student":"Update student"}</button>{" "}
          <button type="reset">Clear</button>
        </div>
      </div>
    </form>
  );
}
