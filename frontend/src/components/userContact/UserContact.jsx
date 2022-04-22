import React from "react";
import { Link } from 'react-router-dom'
import "./UserContact.css";

function UserContact({ userdata }) {
  return (
    <>
      <div className="mt-3">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-3">
            <Link to={`user/other/${userdata._id}`}>
            <img
              src={userdata.picture}
              alt={`user${userdata._id}`}
              className="img-fluid userImg"
            />
            </Link>
          </div>
          <div className="col-7 mt-2">
          <Link to={`/user/other/${userdata._id}`} style={{textDecoration:"none",color:"black"}}>
            <h5 className="userName">{userdata.firstName+" "+userdata.lastName}</h5>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserContact;
