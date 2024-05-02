import React, { useEffect, useState } from "react";
import { useFireBase } from "../context/Firebase";
import BookCard from "../components/BookCard";

export const Collections = () => {
  const { getAllBooks } = useFireBase();
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllBooks().then((data) => setBooks(data.docs));
  }, []);
  
  // console.log(search)
  if (books.length === 0) {
    return (<div className="container mt-5">
      <p className="text-center">No Books are available to show</p>
    </div>);
  }
  return (
    <>      <div className="container mt-5">
      <input type="text" placeholder=" search book by name" value={search} onChange={(e) => setSearch(e.target.value)} className="p-2 m-1 mb-3"/>
      <div className="row">
        {books.map((book, index) => {
          if (book.data().bookName.toLowerCase().match(search.toLowerCase())) {
            // console.log(search , book.data().bookName)
            return (
              <div key={index} className="col-md-3 mb-4">
                <BookCard book={book.data()} />
              </div>
            )
          }
        })}
      </div>
    </div>
    </>
  );
};
export default Collections;
