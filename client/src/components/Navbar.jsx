// function Navbar() {
//   return (
//     <nav className="navbar">
//       <h2>Task Manager</h2>

//       <div>
//         <button>Login</button>
//         <button>Register</button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Task Manager</h2>

      <div className="nav-links">
        <Link to="/">Login</Link>

        <Link to="/register">
          Register
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/task">
          Task Form
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;