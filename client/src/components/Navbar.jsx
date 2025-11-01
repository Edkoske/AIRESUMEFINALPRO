import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link> |{" "}
      <Link to="/resume-editor">Resume Editor</Link> |{" "}
      <Link to="/portfolio-manager">Portfolio Manager</Link>
    </nav>
  );
}

export default Navbar;
