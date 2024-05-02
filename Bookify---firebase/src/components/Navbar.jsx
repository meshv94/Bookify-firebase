import React from "react";
import { Link } from 'react-router-dom'
import { useFireBase } from "../context/Firebase";

const NavbarComponent = () => {
  const { signOutUser, user } = useFireBase();


  const handleSignOut = () => {
    signOutUser()
    
  }
  return (

    <header className="main_nav container d-flex justify-content-between">
        <div className="main_logo d-flex">
          <img
            className="padding-2"
            src="https://t4.ftcdn.net/jpg/01/22/80/19/240_F_122801904_HXZWzCigJFIe0I1v12zqgzRI4U5CrWFz.jpg"
            alt=""
            width={100}
          />
          <div className="main_heading">
            Bookify
            <p>public library</p>
          </div>
        </div>
        <div className="main_list">
          
          <ul>
          {
            user ? 
            <Link><img className="rounded-circle mx-2" src={user.photoURL} alt="" width={30}/>{ user.displayName || user.email}</Link>
            :
            <></>
          }
            <Link to={"/"}>Home</Link>
            <Link to={'https://www.linkedin.com/in/meshv-patel-843539226/'} target="_blank">Contact</Link>
            <Link to='/list/collection'>collections</Link>
            <Link to='/list/book'>add Book</Link>
            {
            user ?
              (
                <>
                <Link onClick={handleSignOut}>Logout</Link>
                </>
              ) :
              (
                <>
                  <Link to="/login">Login/Register</Link>
                  {/* <Link to="/register">Register</Link> */}
                </>
              )
          }
          
          </ul>
        </div>
      </header>
  );
};
export default NavbarComponent;
