import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserSuggestion from "../../components/userSuggestion/UserSuggestion";
import "./OtherProfile.css";
import { FaUserPlus } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

function OtherProfile() {
  const params = useParams();
  const [individualData, setIndividualData] = useState({});

  useEffect(() => {
    async function IndiviualUser() {
      const res = await fetch(`/api/data/other/${params.id}`, {
        method: "GET",
      });

      const data = await res.json();
      setIndividualData(data);
      console.log(data);
    }

    IndiviualUser();
  }, [params.id]);

  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem("loginData"))
  );

  const { id } = localData;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(`/api/users/${id}/${params.id}`, {
        method: "GET",
      });

      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, [params.id]);
  console.log(individualData);
  console.log(individualData.firstName);
  return (
    <>
      <div className="container profilebg">
        <div className="row">
          <div className="col-xs-12 col-md-7 p-3 formbg my-4 ms-md-4">
            <div className="bgImage2"></div>
            <img
              src={individualData.picture}
              className="img-fluid profile-pic"
              alt="profilepic"
            />

            <div className="ms-3">
              <h2 className="fw-bold">
                {individualData.firstName + " " + individualData.lastName}
              </h2>
              <h5 className="intro">
                {individualData.firstName + " " + individualData.lastName} is a{" "}
                {individualData.designation} at{" "}
                <span className="fw-bold">to the new</span> company
              </h5>
              <p className="mt-2 para2">
                {individualData.city} &nbsp; . {individualData.state} &nbsp; .
                India &nbsp; . 234 friends
              </p>

              <button type="button" className="btn btn-primary d-inline-block">
                <FaUserPlus size={20} />
                <span className="but1">&nbsp; Add Friend</span>
              </button>

              <button
                type="button"
                className="btn btn-outline-warning d-inline-block ms-3"
              >
                <FiExternalLink />
                <span className="but1">
                  &nbsp;{" "}
                  <a
                    className="hover1"
                    href={individualData.websiteUrl}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    Visit Website
                  </a>
                </span>
              </button>
            </div>
          </div>

          <div className="col-xs-12 col-md-4 ps-md-5">
            <div className="box1 mt-md-4 mb-md-5 mb-xs-2 mt-xs-2">
              <h5 className="text-capitalize fw-bold ps-3 pt-4 pb-1">
                Suggestions
              </h5>

              {users.map((user) => (
                <UserSuggestion key={user.id} userdata={user} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtherProfile;
