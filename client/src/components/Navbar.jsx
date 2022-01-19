import ham from "../assets/img/hamburger.svg";
import {Route, Routes} from "react-router-dom";

const Navbar = ({sidebarCollapse}) => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <button onClick={sidebarCollapse}><img src={ham} alt="" /></button>
          <Routes>
              <Route path="/" element={<p>Homepage</p>}/>
              <Route path="students" element={<p>Students List</p>}/>
              <Route path="student/:id" element={<p>Student Info</p>}/>
          </Routes>

        <a href="/">Start</a>
      </div>
    </div>
  );
};

export default Navbar;
