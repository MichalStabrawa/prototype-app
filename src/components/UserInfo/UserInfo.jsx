import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { auth, database } from "../../firebase/firebase";
import authSlice from "../../store/auth";
import { FaUser, FaRegUser } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { fetchUserSalary } from "../../store/fetchUserData/fetchUserSalary";
import {fetchUserExpenses} from '../../store/fetchUserData/fetchUserExpenses';

const UserInfo = () => {
  const dispatch = useDispatch();
  const { data, isLoading, status, error } = useSelector(
    (state) => state.fetchUserSalary
  );
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth1 = useSelector((state) => state.auth.isAuthenticated);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;

        if (currentUser) {
          const userRef = database.ref(`users/${currentUser.uid}/salary`);

          // Fetch user data from the Realtime Database asynchronously
          const snapshot = await userRef.once("value");
          const data = snapshot.val();

          const loadedSalary = [];
          for (const key in data) {
            for (const innerKey in data[key]) {
              loadedSalary.push({
                name: data[key][innerKey].name,
                expenses: data[key][innerKey].expenses,
                id: data[key][innerKey].id,
              });
            }
          }

          setUserData(loadedSalary);
        } else {
          // If no user is signed in, set user data state to null
          setUserData(null);
        }

        // Set loading to false once the data is fetched
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        setLoading(false);
      }
    };

    // Call the async function
    fetchUserData();
  }, [auth, auth1]);
  // The empty dependency array ensures that this effect runs only once on mount;

  useEffect(() => {
    if (user) {
      dispatch(fetchUserSalary({ auth: auth, database: database }));
      dispatch(fetchUserExpenses({ auth: auth, database: database }))
    }
  }, [dispatch, user]);



  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Dropdown>
            <Dropdown.Toggle
              variant={auth1 ? "success" : "outline-secondary"}
              id="dropdown-basic"
            >
              {auth1 ? <FaUser /> : <FaRegUser />}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                User:{" "}
                {auth1 && status === "success" ? (
                  <div>
                    <span>
                      {" "}
                      {user?.email}{" "}
                      <ul>
                        {data.map((el, index) => (
                          <li key={index}>{el.name}</li>
                        ))}
                      </ul>{" "}
                    </span>
                  </div>
                ) : (
                  <Link to="/login">sign in</Link>
                )}{" "}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Render other user data as needed */}
        </div>
      )}
    </>
  );
};

export default UserInfo;
