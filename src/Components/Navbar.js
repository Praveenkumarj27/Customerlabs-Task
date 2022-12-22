import { ArrowBackIos } from "@mui/icons-material";
import React from "react";
import "../CSS/Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <ArrowBackIos className="back" />
      View Audience
    </div>
  );
}

export default Navbar;
