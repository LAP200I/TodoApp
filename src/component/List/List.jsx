import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./List.css";

const List = ({
  items,
  handleDelete,
  handleEdit,
  handleEditSubmit,
  editField,
  editItemId,
  handleToggleComplete,
}) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = items.slice(startIndex, endIndex);
  return (
    <>
      <ul className="list">
        {[...currentItems].map((item) => {
          if (item.id === editItemId) {
            return (
              <li key={item.id}>
                <form onSubmit={(e) => handleEditSubmit(e, item.id)}>
                  <input
                    className="edit"
                    defaultValue={item.title}
                    ref={editField}
                  />
                  <button className="btn-check" title="Save task?">
                    <i className="fas fa-check"></i>
                  </button>
                </form>
              </li>
            );
          } else {
            return (
              <li
                key={item.id}
                onDoubleClick={() => handleEdit(item.id)}
                className={item.completed ? "completed item" : "item"}
                data-title={
                  item.title?.length > screen.width / 20 ? item.title : ""
                }
              >
                <span className="indexList">{items.indexOf(item) + 1}</span>
                <label className={item.completed ? "completed title" : "title"}>
                  {item.title.length > screen.width / 20
                    ? item.title.substring(0, screen.width / 20) + "..."
                    : item.title}
                </label>

                <div className="function">
                  <button
                    className={`btn btn-check ${
                      item.completed ? "completed" : ""
                    }`}
                    onClick={() => handleToggleComplete(item.id)}
                    title="Complete task?"
                  >
                    <i className="fas fa-check"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                    title="Delete task?"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </li>
            );
          }
        })}
      </ul>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </>
  );
};

export default List;
