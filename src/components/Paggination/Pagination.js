
import classes from "./Pagination.module.scss";

function Pagination({ nPages,  setCurrentPage,  currentPage}) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = (e) => {
    e.preventDefault()
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = (e) => {
    e.preventDefault()
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className={classes.pagination_wrapper}>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={prevPage}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {pageNumbers.map((pgNumber) => (
            <li key={pgNumber} className={`page-item ${currentPage ==pgNumber? 'active': undefined}`}>
              <a
                onClick={(e)=>{e.preventDefault();setCurrentPage(pgNumber)}}
                className="page-link"
                href="#"
              >
                {pgNumber}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={nextPage}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
