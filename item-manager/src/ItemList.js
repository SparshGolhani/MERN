import React, { useState, useEffect } from "react";

function ItemList({ items }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when items change
  }, [items]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <li key={index}>
              {item.image && <img src={item.image} alt={item.title} style={{ width: "50px" }} />}
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>Qty: {item.qty}</p>
                <p>Price: ${item.price}</p>
                <p>Date: {item.date}</p>
              </div>
            </li>
          ))
        ) : (
          <p>No items available</p>
        )}
      </ul>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        paginate={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
}

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? "active" : ""}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ItemList;