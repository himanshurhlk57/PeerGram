import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import CreatePost from "../feed/CreatePost";
import SideBar from "../sideBarComponent/SideBar";
import UserContact from "../userContact/UserContact";
import UserSuggestion from "../userSuggestion/UserSuggestion";
import Feed from "../feed/Feed";
import { useState, useEffect } from "react";
function Body() {

  const [feeds, setFeeds] = useState([]);

  const [localData,setLocalData] = useState(JSON.parse(localStorage.getItem("loginData")));
    
  const {id,email} = localData;

  const [items,setItems] = useState({}) 

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/data/${email}`, {
        method: "GET",
      });

      const data = await res.json();
      setItems(data);
    }
    fetchData();
  },[]);

  useEffect(()=>{
    async function feedData(){
      const response = await fetch("/api/feeds", {
        method: "GET"
      });
      const feedData = await response.json();
      setFeeds(feedData);
    }
    feedData();
  },[])

  
  const [users,setUsers] = useState([])

  useEffect(()=>{
    async function fetchUsers(){
      const res = await fetch(`/api/users/${id}`,{
        method: 'GET',
      })

      const users = await res.json();
      setUsers(users);
    }
    fetchUsers();
  },[])


  const bodyStyle = {
    backgroundColor: "#DFDFDE",
  };

  return (
    <div>
      <Container style={bodyStyle}>
        <Row>
          <Col xs={10} md={3}>
            <SideBar items={items} />
          </Col>
          <Col xs={10} md={6} className="mt-4">
            <CreatePost items={items} />
            {feeds.map((feed) => (
              <Feed key={feed._id} feed={feed} items={items}/>
            ))}
            {/* <Feed items={items} />  */}
          </Col>
          <Col xs={10} md={3}>
            <div>
              <div className="box1 mt-md-4 mb-md-5 mb-xs-2 mt-xs-2">
                <h5 className="text-capitalize fw-bold ps-3 pt-4 pb-1">
                  Contacts
                </h5>

                {users.map((user) => (
                  <UserContact key={user._id} userdata={user} />
                ))}
              </div>

              <div className="box2">
                <h5 className="text-capitalize fw-bold ps-3 pt-4 pb-1">
                  Suggestions
                </h5>

                {users.map((user) => (
                  <UserSuggestion key={user._id} userdata={user} />
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Body;
