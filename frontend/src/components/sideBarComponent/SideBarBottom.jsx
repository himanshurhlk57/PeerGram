import React from "react";
import SideBarMain from "./SideBarMain";
import { Card } from "react-bootstrap";
function SideBarBottom() {
  return (
    <div>
      <Card border="info" style={{ width: "18rem", marginTop: "50px" }}>
        <SideBarMain
          heading={"Recent"}
          textOne={"#javascript"}
          textTwo={"Mobile Trends conference 2021"}
          textThree={"Freelance Developers"}
        />
        <hr />
        <SideBarMain
          heading={"Groups"}
          textOne={"#javascript"}
          textTwo={"Mobile Trends conference 2021"}
          textThree={"Freelance Developers"}
        />
        <hr />
        <SideBarMain heading={"Subscriptions"}
        textOne={"Programming with Mosh"}
        textTwo={"E-learning Bridge"}
        textThree={"Clever Programmer"}
         />
      </Card>
    </div>
  );
}

export default SideBarBottom;
