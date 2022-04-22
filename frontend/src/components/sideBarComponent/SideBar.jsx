import React from "react";
import { Card } from "react-bootstrap";
import SideBarBottom from "./SideBarBottom";
function SideBar({ items }) {
  const textStyle = {
    textAlign: "center",
    marginTop: "5px",
  };

  const profileDetailStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  };

  const imgStyle = {
    position: "relative",
    left: "85px",
    top: "20px",
    width: "100px",
    borderRadius: "50%",
  };

  return (
    <div>
      <Card style={{ width: "18rem", marginTop: "30px" }}>
        <Card.Img variant="top" src={items.picture} style={imgStyle} />
        <Card.Body>
          <Card.Title style={textStyle}>
            {items.firstName + " " + items.lastName}
          </Card.Title>
          <div className="cardBottomText">
            <h6 style={textStyle}>Newly Recruit at Tesla</h6>
          </div>
          <div className="profileDetails" style={profileDetailStyle}>
            <div className="profileViews">
              <p>234</p>
              <p>Profile Views</p>
            </div>
            <div className="postDetails">
              <p>11</p>
              <p>Post</p>
            </div>
          </div>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
      <SideBarBottom />
    </div>
  );
}

export default SideBar;
