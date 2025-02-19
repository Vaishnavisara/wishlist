// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       setErrorMessage("Email and password are required!");
//       return;
//     }
//     setErrorMessage("");
    
//     const response = await fetch('https://script.google.com/macros/s/AKfycbwiURBB6t8DfJBtEtFA8VY78fQVHa71o9XuU8lF7Z7aMnnsJJBtxdZ3M4TmwWNOfFGI/exec', {
//       method: 'POST',
//       body: JSON.stringify({
//         action: 'login',
//         email: email,
//         password: password
//       })
//     });

//     const result = await response.text();
//     if (result === "Login successful") {
//       onLogin(email, password, navigate);
//     } else {
//       setErrorMessage('Invalid credentials');
//     }
//   };

//   return (
//     <div className="overlay">
//       <div className="card">
//         <h2>Login</h2>
//         <input
//           type="text"
//           placeholder="Enter your email"
//           className="input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter your password"
//           className="input"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//         <button onClick={handleLogin} className="button">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;