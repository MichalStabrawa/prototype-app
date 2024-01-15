import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebase";
import Table from "react-bootstrap/Table";

function ShowSavedSalary() {
  const { data, status, isLoading, error } = useSelector(
    (state) => state.fetchUserSalary
  );
  const logInUser = auth.currentUser;
  return (
    <div>
      {logInUser && <p>User: {logInUser.email}</p>}
      {status === "success" && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th> Name</th>
              <th>expanses</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.expenses}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ShowSavedSalary;
