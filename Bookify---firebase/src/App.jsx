import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// import Register from "./pages/Register";
import NavbarComponent from "./components/Navbar";
import  Home  from "./pages/Home";
import ListBook from "./pages/ListBook";
import Collections from "./pages/Collections";
import { useFireBase } from "./context/Firebase";
import ShowBook from "./components/ShowBook";

function App() {
  const {user} = useFireBase()

  return (
    <>
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={user?<Home/>:<Login />} />
          {/* <Route path="/register" element={user?<Home/>:<Register />} /> */}
          <Route path="/list/book" element={user?<ListBook />:<Login/>} />
          <Route path="/list/collection" element={user?<Collections />:<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
