import React, { useState } from "react";
import Savingsegment from "./Savingsegment";
import "../CSS/Home.css";

function Home() {
  const [bool, setbool] = useState(true);

  const popup = () => {
    setbool(true);
    if (bool) {
      const background = document.querySelector(".wrapper");
      setbool(false);

      background.setAttribute("style", "opacity:0.2");
      background.setAttribute("style", "background-color:lightgrey");
      const button = document.querySelector("button");
      button.setAttribute("style", "position:none");

      button.setAttribute("style", "opacity:0.2");
      button.setAttribute("style", "background-color:lightgrey");
    } else {
      const background = document.querySelector(".wrapper");
      setbool(true);

      const button = document.querySelector("button");

      background.setAttribute("style", "opacity:1");
      background.setAttribute("style", "background-color:white");
      button.setAttribute("style", "opacity:1");
      button.setAttribute("style", "background-color:teal");
    }
  };
  return (
    <div className="wrapper">
      <button
        onClick={() => {
          popup();
        }}
      >
        Save segment
      </button>
      <Savingsegment className="segment" appear={bool} setappear={setbool} />
    </div>
  );
}

export default Home;
