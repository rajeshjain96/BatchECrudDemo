export default function NavBar(props) {
  let { message } = props;
  let { user } = props;
  function handleSignupButtonClick() {
    props.onSignupButtonClick();
  }
  function handleHomeButtonClick() {
    props.onHomeButtonClick();
  }
  function handleLoginClick() {
    props.onLoginClick();
  }
  function handleLogoutClick() {
    props.onLogoutClick();
  }
  return (
    <>
      <div className="row bg-primary p-3">
        <div className="col-4">
          <button className="btn btn-secondary" onClick={handleHomeButtonClick}>
            Home
          </button>{" "}
          {!user&&<button className="btn btn-secondary" onClick={handleLoginClick}>
            Login
          </button>}
          {user&&<button className="btn btn-secondary" onClick={handleLogoutClick}>
            Logout
          </button>}
          {!user && (
            <button
              className="btn btn-secondary"
              onClick={handleSignupButtonClick}
            >
              Signup
            </button>
          )}
        </div>
        {user && <div>Welcome {user.name}</div>}
      </div>
      {message && <div className="text-center text-danger">{message}</div>}
    </>
  );
}
