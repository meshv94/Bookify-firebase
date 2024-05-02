// import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { useFireBase } from "../context/Firebase";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const { signupWithEmailandPassword, signupWithGoogle, user } = useFireBase();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     signupWithEmailandPassword(email, password);
//   };

//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user]);
//   return (
//     <div className="container mt-5  border p-4">
//       <h2 className="text-center mb-3 p-2"> Register </h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Example@email.com"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             required
//           />
//           <Form.Text className="text-muted">
//             We'll never share your email with anyone else.
//           </Form.Text>
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="formBasicPassword">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             required
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Register
//         </Button>
//       </Form>
//       <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
//       <Button
//         variant="light"
//         onClick={signupWithGoogle}
//         className="border btn btn-outline-dark"
//       >
//         <img
//           src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
//           width={20}
//           className="m-2"
//         />
//         Sign up with Google
//       </Button>
//     </div>
//   );
// };
// export default Register;
