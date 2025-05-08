import AStudent from "./AStudent";

export default function List(props) {
  let { studentList } = props;
  function handleDeleteButtonClick(s, ans) {
    props.onDeleteButtonClick(s, ans);
  }
  function handleEditButtonClick(s) {
    props.onEditButtonClick(s);
  }
  function handleEditButtonClick(s) {
    props.onEditButtonClick(s);
  }
  return (
    <>
      {studentList.length != 0 && (
        <div className="my-4">
          {studentList.map((e, index) => (
            <AStudent
              s={e}
              key={index}
              index={index}
              onDeleteButtonClick={handleDeleteButtonClick}
              onEditButtonClick={handleEditButtonClick}
            />
          ))}
        </div>
      )}
      {studentList.length == 0 && (
        <div className="h3 text-center text-primary my-4">No students...</div>
      )}
    </>
  );
}
