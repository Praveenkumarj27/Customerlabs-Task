import React from "react";
import { useState } from "react";
import "./Segment.css";
import Popup from "../Popup/Popup";

function Segment() {
  const [display, setDisplay] = useState(true);
  let handlePopup = () => {
    setDisplay(!display);
    if (display) {
      let ele = document.querySelector(".popup-wrapper");
      ele.setAttribute("style", "display:block");
    } else {
      document.querySelector(".popup-wrapper").removeAttribute("style");
    }
  };

  return (
    <>
      <div className="segment-nav">
        <div className="nav-name">Customer Labs</div>
      </div>
      <div className="wrapper">
        <div className="segment-container">
          <button className="btn" onClick={() => handlePopup()}>
            Save Segment
          </button>
        </div>
        <Popup handlePopup={handlePopup} />
      </div>
    </>
  );
}

export default Segment;
