import { useEffect, useState } from "react";
import classes from "./TableExpenses.module.scss";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { FaCalendarPlus, FaCalendarTimes, FaEdit } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { LuCalendarClock } from "react-icons/lu";
import { MdDeleteForever } from "react-icons/md";
import Modal from "react-bootstrap/Modal";

function TableExpenses({ data, status }) {
  const [editId, setEditId] = useState();
  const [filterIdData, setFilterIdData] = useState();
  const [show, setShow] = useState(false);

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
  };
  const handleShow = (e) => {
    if (e.target.name === "edit") {
      setShow(true);
    }
  };

  useEffect(() => {
    if (editId) {
      const editFilter = data.filter((el) => el.id === editId);
      setFilterIdData(editFilter);
    }
  }, [show]);

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
      </Popover.Body>
    </Popover>
  );

  return (
    <div className={classes.table_wrapper}>
      <Table responsive="sm" striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>Value</th>
            <th>Category</th>
            <th>Date</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            status === "success" &&
            data.map((el, index) => {
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
                          trigger="click"
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
                          trigger="click"
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
                </tr>
              );
            })}
        </tbody>
      </Table>
      {filterIdData && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{filterIdData[0].name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            category: {filterIdData[0].category} value:{" "}
            {filterIdData[0].expenses} date: {filterIdData[0].fullDate}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default TableExpenses;
