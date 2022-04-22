import React from "react";
import { Card } from "react-bootstrap";
import { FaHashtag, FaCalendarAlt } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
function SideBarMain({ heading, textOne, textTwo, textThree }) {
  const spanStyle = {
    marginLeft: "15px",
    
  };
  return (
    <div>
      <Card.Header>{heading}</Card.Header>
      <Card.Body>
        <FaHashtag />
        <span style={spanStyle}>{textOne}</span>
        <br />
        <FaCalendarAlt />
        <span style={spanStyle}>{textTwo}</span>
        <br />
        <MdPersonAdd />
        <span style={spanStyle}>{textThree}</span>
        <br />
        <span style={{ color: "#6CB4EE" }}>Show more</span>
      </Card.Body>
    </div>
  );
}

export default SideBarMain;
