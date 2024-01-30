import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth, database } from "../../../firebase/firebase";
import classes from "./TableExpenses.module.scss";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { FaCalendarPlus, FaCalendarTimes, FaEdit } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { fetchUserExpenses } from "../../../store/fetchUserData/fetchUserExpenses";
import { calculateDateDifference } from "../../../utils/countDifferencesInDays";
import { MdOutlineUpdate } from "react-icons/md";
import { GrCheckboxSelected } from "react-icons/gr";
import TableExpensesModal from "./TableExpensesModal/TableExpensesModal";
import FilterShowSalary from "../../FilterShowSalary/FilterShowSalary";
import Pagination from "../../Paggination/Pagination";
import Alert from 'react-bootstrap/Alert'

function TableExpenses({
  data,
  status,
  nPages,
  setCurrentPage,
  currentPage,
  currentRecords,
  radioChecked,
  selectedRadio,
  flagExpenses,
  handleSwitchToggle,
  isCheckedFiltr,
  handleSearchInput,
  counter
}) {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState();
  const [filterIdData, setFilterIdData] = useState();
  const [show, setShow] = useState(false);
  const [newDeadlineDate, setNewDeadlineDate] = useState();
  const [flag, setFlag] = useState(false);
  const [modal, setModal] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    expenses: 0,
    category: "",

    deadline: "off",
  });
  const [isChecked, setIsChecked] = useState(false);

  const [dataInput, setData] = useState({
    name: "",
    expenses: 0,
    category: "",

    deadline: "off",
  });

  const countExpencesAfterDate = () => {
    let tab = [];
    if (currentRecords) {
      currentRecords.map((el, index) => {
        if (
          el.deadlineDate !== "" &&
          calculateDateDifference(el.deadlineDate) <= 0
        ) {
          tab = [...tab, el.deadlineDate];
        }
      });
    }
    return tab.length;
  };

  const user = auth.currentUser;

  const editHandle = (e) => {
    const id = e.target.id;
    console.log(id);
    if (id) {
      setEditId(id);
    } else {
      const parent = e.target.closest("svg");

      setEditId(parent.getAttribute("id"));
    }
  };

  const handleClose = () => {
    setShow(false);
    setEditId(null);
    setFilterIdData(null);
    setModal(null);
    setFormData({
      name: "",
      expenses: 0,
      category: "",

      deadline: "off",
    });
    setIsChecked(false);
  };

  const handleShow = (e) => {
    if (e.target.name === "deadline") {
      setShow(true);
      setModal("deadline");
      alert("Deadline");
    }
    if (e.target.name === "delete") {
      setShow(true);
      setModal("delete");
    }
    if (e.target.name === "edit") {
      setShow(true);
      setModal("edit");
    }
    if (e.target.name === "select-paid") {
      setShow(true);
      setModal("select-paid");
    }
  };

  const handleDeadlineDate = (e) => {
    const deadline = e.target.value;
    setNewDeadlineDate(deadline);
  };

  const handleInputChecboxPaid = (e) => {
    const { name, checked } = e.target;
    const data = {
      name: filterIdData[0].name,
      expenses: filterIdData[0].expenses,
      category: filterIdData[0].category,
    };
    setFormData({
      ...data,
      [name]: checked ? "off" : "on",
    });
    setIsChecked(!isChecked);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Handle checkbox separately
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked ? "on" : "off", // Update checkbox value to 'on' or 'off'
      }));
    } else {
      // Handle other input types
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === "expenses" ? +value : value.toUpperCase(),
      }));
      setData((prevFormData) => ({
        ...prevFormData,
        [name]: name === "expenses" ? +value : value,
      }));
    }
  };

  // Delete data function

  const deleteData = async () => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser && filterIdData && filterIdData.length > 0) {
        const path = `users/${currentUser.uid}/expenses`;
        const expensesRef = database.ref(path);

        // Fetch the entire object of expenses from the database
        const snapshot = await expensesRef.once("value");
        const expensesObject = snapshot.val();

        if (expensesObject) {
          // Iterate through each key and remove objects with the specified ID
          Object.keys(expensesObject).forEach(async (key) => {
            const updatedArray = expensesObject[key].filter(
              (el) => el.id !== filterIdData[0].id
            );

            if (updatedArray.length !== expensesObject[key].length) {
              // If the array was updated, set the new array
              await expensesRef.child(key).set(updatedArray);
            }
          });

          console.log("Data deleted successfully");
          setFlag(true);
          flagExpenses(true);
        } else {
          console.error("Data not found");
        }
      } else {
        console.error("User not authenticated or filterIdData is not set");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    handleClose();
  };

  //update deadlineData

  const updateData = async () => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const path = `users/${currentUser.uid}/expenses`;
        const expensesRef = database.ref(path);

        // Fetch the entire object of expenses from the database
        const snapshot = await expensesRef.once("value");
        const expensesObject = snapshot.val();

        if (expensesObject) {
          // Update the specific object in the array with the new data
          const updatedObject = { ...expensesObject };

          // Iterate through each key and update the corresponding array
          Object.keys(updatedObject).forEach((key) => {
            console.log(updatedObject);
            console.log(`key  ${key}`);
            updatedObject[key] = updatedObject[key].map((el) => {
              if (el.id === filterIdData[0].id) {
                console.log("Found object to update:", el);
                return {
                  ...el,
                  deadlineDate:
                    newDeadlineDate !== undefined
                      ? newDeadlineDate
                      : el.deadlineDate,
                };
              } else {
                return el;
              }
            });
          });

          // Check if the object was found and updated
          const objectFound = Object.keys(updatedObject).some((key) =>
            updatedObject[key].some((el) => el.id === filterIdData[0].id)
          );

          if (objectFound) {
            // Update the entire 'expenses' node with the modified object
            await expensesRef.set(updatedObject);
            console.log("Data updated successfully");
            setFlag(true);
            flagExpenses(true);
          } else {
            console.error("Object not found in the array");
            console.log("Original object:", expensesObject);
          }
        } else {
          console.error("Data not found");
        }
      } else {
        console.error("User not authenticated");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
    handleClose();
  };

  const editUpdateData = async () => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const path = `users/${currentUser.uid}/expenses`;
        const expensesRef = database.ref(path);

        // Fetch the entire object of expenses from the database
        const snapshot = await expensesRef.once("value");
        const expensesObject = snapshot.val();

        if (expensesObject) {
          // Update the specific object in the array with the new data
          const updatedObject = { ...expensesObject };

          // Iterate through each key and update the corresponding array
          Object.keys(updatedObject).forEach((key) => {
            updatedObject[key] = updatedObject[key].map((el) => {
              if (el.id === filterIdData[0].id) {
                console.log("Found object to update:", el);
                return {
                  ...el,
                  deadline: formData.deadline, // Use form data for deadline

                  category: formData.category || el.category, // Update category if provided in form data
                  expenses: formData.expenses || el.expenses, // Update expenses if provided in form data
                  name: formData.name || el.name, // Update name if provided in form data
                  // Fulldate and monthYear remain the same
                };
              } else {
                return el;
              }
            });
          });

          // Check if the object was found and updated
          const objectFound = Object.keys(updatedObject).some((key) =>
            updatedObject[key].some((el) => el.id === filterIdData[0].id)
          );

          if (objectFound) {
            // Update the entire 'expenses' node with the modified object
            await expensesRef.set(updatedObject);
            console.log("Data updated successfully");
            setFlag(true);
            flagExpenses(true);
          } else {
            console.error("Object not found in the array");
            console.log("Original object:", expensesObject);
          }
        } else {
          console.error("Data not found");
        }
      } else {
        console.error("User not authenticated");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
    handleClose();
  };

  useEffect(() => {
    if (editId) {
      const editFilter = data.filter((el) => el.id === editId);
      setFilterIdData(editFilter);
    }
  }, [show]);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserExpenses({ auth: auth, database: database }));
      setFlag(false);
    }
  }, [flag, dispatch, user]);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Change</Popover.Header>
      <Popover.Body>
        <span className={classes.popover}>
          <Button
            onClick={handleShow}
            variant="link"
            className={classes.button_pop}
            name="edit"
          >
            <FaEdit color="#334565" fontSize="1.5em" /> Edit
          </Button>
        </span>
        <span className={classes.popover}>
          <Button
            onClick={handleShow}
            className={classes.button_pop}
            variant="link"
            name="deadline"
          >
            <LuCalendarClock color="#7360DF" fontSize="1.5em" /> Add deadline
            date
          </Button>
        </span>
        <span className={classes.popover}>
          <Button
            onClick={handleShow}
            className={classes.button_pop}
            variant="link"
            name="delete"
          >
            <MdDeleteForever color="#f30e25" fontSize="1.5em" /> Delete
          </Button>
        </span>
        <span className={classes.popover}>
          <Button
            onClick={handleShow}
            className={classes.button_pop}
            variant="link"
            name="select-paid"
          >
            <GrCheckboxSelected fontSize="1.5em" color="green" /> Select paid
          </Button>
        </span>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className={classes.table_wrapper}>
      <FilterShowSalary
        filter="true"
        change={handleSearchInput}
        isChecked={isCheckedFiltr}
        handleCheckbox={handleSwitchToggle}
        radioChecked={radioChecked}
        selectedRadio={selectedRadio}
      />
      <Table responsive="lg" striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>Value</th>
            <th>Category</th>
            <th>Date</th>
            <th>Deadline</th>
            <th>Deadline date</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            currentRecords &&
            status === "success" &&
            currentRecords.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.expenses}</td>
                  <td>{el.category}</td>
                  <td>{el.fullDate}</td>
                  <td>
                    {el.deadline === "on" ? (
                      <span className={classes.edit}>
                        {" "}
                        <span className={classes.icon_off}>
                          {" "}
                          <FaCalendarTimes size={20} />
                        </span>{" "}
                        <OverlayTrigger
                          trigger="focus"
                          placement="top"
                          overlay={popover}
                        >
                          <Button
                            id={el.id}
                            variant="link"
                            className={classes.button}
                            onClick={editHandle}
                          >
                            <IoMdMore
                              id={el.id}
                              size={20}
                              className={classes.icon_more}
                            />
                          </Button>
                        </OverlayTrigger>
                      </span>
                    ) : (
                      <span className={classes.edit}>
                        <span className={classes.icon_on}>
                          {" "}
                          <FaCalendarPlus size={20} />
                        </span>{" "}
                        <OverlayTrigger
                          trigger="focus"
                          placement="top"
                          overlay={popover}
                        >
                          <Button
                            id={el.id}
                            onClick={editHandle}
                            variant="link"
                            className={classes.button}
                          >
                            <IoMdMore
                              id={el.id}
                              size={20}
                              className={classes.icon_more}
                            />
                          </Button>
                        </OverlayTrigger>
                      </span>
                    )}
                  </td>
                  <td>
                    {el.deadline === "on" ? (
                      <span className={classes.icon_deadline_wrapper}>
                        {el.deadlineDate}{" "}
                        {el.deadlineDate !== "" &&
                          calculateDateDifference(el.deadlineDate) <= 3 &&
                          calculateDateDifference(el.deadlineDate) > 0 && (
                            <MdOutlineUpdate
                              size={20}
                              className={classes.icon_time}
                            />
                          )}
                        {el.deadlineDate !== "" &&
                          calculateDateDifference(el.deadlineDate) > 3 && (
                            <MdOutlineUpdate
                              size={20}
                              className={classes.icon_long_time}
                            />
                          )}
                        {el.deadlineDate !== "" &&
                          calculateDateDifference(el.deadlineDate) <= 0 && (
                            <MdOutlineUpdate
                              size={20}
                              className={classes.icon_danger}
                            />
                          )}
                      </span>
                    ) : (
                      <FaCheck className={classes.icon_check} />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      {nPages > 0 && currentPage && data.length > 10 && (
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {countExpencesAfterDate() > 0 && counter&&(
        <h5>
          <Alert><MdOutlineUpdate size={25} className={classes.icon_danger} />
          {countExpencesAfterDate()} bills with a past due date!!!</Alert>
          
        </h5>
      )}

     

      {filterIdData && (
        <TableExpensesModal
          show={show}
          handleClose={handleClose}
          filterIdData={filterIdData}
          modal={modal}
          handleDeadlineDate={handleDeadlineDate}
          formData={formData}
          handleInputChange={handleInputChange}
          editUpdateData={editUpdateData}
          isChecked={isChecked}
          handleInputChecboxPaid={handleInputChecboxPaid}
          updateData={updateData}
          deleteData={deleteData}
        />
      )}
    </div>
  );
}

export default TableExpenses;
