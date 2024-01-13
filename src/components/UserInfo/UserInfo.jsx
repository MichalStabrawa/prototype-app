import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth, database } from "../../firebase/firebase";
import authSlice from "../../store/auth";
import { FaUser, FaRegUser } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";

const UserInfo = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth1 = useSelector((state) => state.auth.isAuthenticated);

  console.log("USER DATA");
  console.log(userData);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;

        if (currentUser) {
          const userRef = database.ref(`users/${currentUser.uid}/signInDates`);

          // Fetch user data from the Realtime Database asynchronously
          const snapshot = await userRef.once("value");
          const userDataFromDatabase = snapshot.val();

          setUserData(userDataFromDatabase);
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
  }, [auth, auth1]); // The empty dependency array ensures that this effect runs only once on mount

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
                User: {auth1 ? user?.email : "sign in"}{" "}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Render other user data as needed */}
        </div>
      ) }
    </>
  );
};

export default UserInfo;
