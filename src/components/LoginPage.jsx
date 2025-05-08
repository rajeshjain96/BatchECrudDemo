import { useEffect, useState } from "react";

export default function LoginPage(props) {
  let { view } = props;
  let [user, setUser] = useState({});
  useEffect(() => {}, []);
  function handleTextChange(event) {
    // console.log(event.target.name);
    // console.log(event.target.value);
    let obj = { ...user };
    obj[event.target.name] = event.target.value;
    setUser(obj);
  }
  function handleFormSubmit(event) {
    event.preventDefault(); // do not refresh
    props.onLoginFormSubmit(user);
  }

  return (
    <>
      <h3 className="my-3">Login</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="row w-75 mx-auto bg-primary my-5 p-3">
          <div className="col-6 text-end my-2">Enter Email-id: </div>
          <div className="col-6 text-start my-2">
            <input
              type="email"
              size="40"
              name="emailid"
              value={user.emailid}
              onChange={handleTextChange}
            />{" "}
          </div>
          <div className="col-6 text-end my-2">Enter Password: </div>
          <div className="col-6 text-start my-2">
            <input
              type="password"
              size="40"
              name="password"
              value={user.pasword}
              onChange={handleTextChange}
            />{" "}
          </div>
          <div className="my-3">
            <button type="submit">Ok</button>{" "}
            <button type="reset">Clear</button>
          </div>
        </div>
      </form>
    </>
  );
}
