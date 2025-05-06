
export default function NavBar(props) {
  let { message } = props;
  return (
    <>
      <div className="row bg-primary p-3">
        <div className="col-4">
          <button className="btn btn-secondary">Login</button>{" "}
          <button className="btn btn-secondary">Signup</button>
        </div>
      </div>
      {message && <div className="text-center text-danger">{message}</div>}
    </>
  );
}
