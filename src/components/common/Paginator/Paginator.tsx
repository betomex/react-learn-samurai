import React, {useEffect, useState} from "react";
import './Paginator.css';

type propsTypes = {
  totalItemsCount: number,
  pageSize: number,
  currentPage: number,
  onCurrentPageChange: (pageNumber: number) => void,
  portionSize?: number
}

const Paginator: React.FC<propsTypes> = (
    {totalItemsCount, pageSize, currentPage, onCurrentPageChange, portionSize = 10}
    ) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages: Array<number> = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionsCount = Math.ceil(pagesCount / portionSize);

  let [currentPortion, setCurrentPortion] = useState(Math.ceil(currentPage / portionSize));
  let [leftPortionEdge, setLeftPortionEdge] = useState(
      currentPage % portionSize === 0
          ? currentPage - portionSize + 1
          : currentPage - (currentPage % portionSize) + 1
  );
  let [rightPortionEdge, setRightPortionEdge] = useState(leftPortionEdge + portionSize - 1);

  useEffect(() => {
    setLeftPortionEdge((currentPortion - 1) * portionSize + 1);
    setRightPortionEdge(currentPortion * portionSize);
  }, [currentPortion, portionSize]);

  return <div className="paginator">
    {currentPortion > 1 && <button onClick={() => {
      setCurrentPortion(currentPortion - 1);
    }}>&#8656;</button>}

    {pages
        .filter(p => p >= leftPortionEdge && p <= rightPortionEdge)
        .map(p => <span className={currentPage === p ? "selectedPage page" : "page"} key={p} onClick={() => {
          onCurrentPageChange(p)
        }}>{p} </span>)}

    {currentPortion < portionsCount && <button onClick={() => {
      setCurrentPortion(currentPortion + 1);
    }}>&#8658;</button>}
  </div>
}

export default Paginator;