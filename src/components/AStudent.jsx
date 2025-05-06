export default function AStudent(props) {
  let { s } = props;
  let { index } = props;
  function handleDeleteButtonClick() {
    let ans = window.confirm("Do you really want to delete this record?");
    if (ans) {
      //yes
      props.onDeleteButtonClick(s,ans);
    }
    else
    {
      // no
      props.onDeleteButtonClick(s, ans);
    }
  }
  return (
    <div className="row w-75 mx-auto bg-primary text-white my-3 p-2">
      <div className="col-1">{index + 1}</div>
      <div className="col-2">{s.rollno}</div>
      <div className="col-3">{s.name}</div>
      <div className="col-3">{s.marks}</div>
      <div className="col-1">
        <button>
          <i className="bi bi-pencil-square"></i>
        </button>
      </div>
      <div className="col-1">
        <button onClick={handleDeleteButtonClick}>
          <i className="bi bi-trash3-fill"></i>
        </button>
      </div>
    </div>
  );
}
