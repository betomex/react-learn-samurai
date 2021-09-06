import React from "react";
import './Paginator.css';

const Paginator = ({totalUsersCount, pageSize, currentPage, onCurrentPageChange}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];

  for (let i = pagesCount; i >= pagesCount - 10; i--) { //TODO =======================================================
    pages.push(i);
  }

  return <div>
    {pages.map(i => <span className={currentPage === i ? "selectedPage" : ""} key={i} onClick={() => {
      onCurrentPageChange(i)
    }}>{i} </span>)}
  </div>
}

export default Paginator;