import React from "react";
import {useNavigate} from 'react-router-dom'
import { useFireBase } from "../context/Firebase";


const Home = () => {
  const navigate = useNavigate();
  const { user } = useFireBase();

  const handleBrowseBook = () => {
    if(user){
      navigate('/list/collection')
    }else{
      navigate('/login')
    }
  };

  const handleViewCollection = ()=>{
    if(user){
      navigate('/list/book')
    }else{
      navigate('/login')
    }
  }

  return (
    <>
      
      <section className="main_sec container">
        <div className="main_sec_img">
          <div className="main_sec-welcome">
            <h1>Welcome to bookify Library</h1>
            <p>Explore and Borrow Books From Our Collection</p>
            <button onClick={handleBrowseBook}>Browse Books</button>
          </div>
        </div>
      </section>
      <section className="safety_sec container">
        <img
          src="https://cdn-icons-png.flaticon.com/128/4200/4200528.png"
          alt=""
          width={80}
        />
        <h1>User-Driven Safety Measures</h1>
        <p>
          At bookify Library, user contributions and interactions drive our
          safety efforts. We encourage responsible borrowing and book returns to
          ensure a safe and enjoyable experience for all. Click here to learn
          more about our safety guidelines.
        </p>
      </section>
      <section className="newArrivals container">
        <h1>Add your Book </h1>
        <p>Discover the latest additions to our collection, contributed by bookify users. Click here to explore and add your own favorite books to the library.</p>
        <button onClick={handleViewCollection}>Add Book</button>
      </section>
      <footer className="main_footer">
        <p>© 2035 by Bookify. Developed by @Meshv</p>
      </footer>
    </>
  );
};
export default Home;
