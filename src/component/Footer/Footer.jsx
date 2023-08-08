import React, { useEffect, useState } from "react";
export default function Footer({
  items,
  deleteAll,
  handleToggleCompleteAll,
  setFilter,
}) {
  const handleFilter = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    const btns = document.querySelectorAll(".btn-check");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");
      });
    });
    btns[0].click();
  }, []);

  return (
    <div className="total-tasks">
      <button className="btn btn-check" onClick={() => handleFilter("")}>
        Total tasks: <span>{items.length}</span>
      </button>
      <button
        className="btn btn-check"
        onClick={() => handleFilter("completed")}
      >
        Completed tasks:
        <span>{items.filter((item) => item.completed).length}</span>
      </button>
      <button className="btn btn-check" onClick={() => handleFilter("pending")}>
        Pending tasks:
        <span>{items.filter((item) => !item.completed).length}</span>
      </button>
      <button
        className="btn btn-danger checkAll"
        onClick={handleToggleCompleteAll}
      >
        Complete All
      </button>
      <button className="btn btn-danger clearAll" onClick={deleteAll}>
        Clear All
      </button>
    </div>
  );
}
