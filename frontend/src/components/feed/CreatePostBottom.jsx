import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { FcLike } from "react-icons/fc";
import { useState } from "react";
import { Button } from "react-bootstrap";

const CommentBox = ({ items, userdata }) => {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="shareTop">
          <img className="profilePicture" src={items.picture} alt="" />
          {userdata}
        </div>
      </div>
    </div>
  );
};

function CreatePostBottom({
  like,
  heart,
  setLike,
  setHeart,
  isLiked,
  setIsLiked,
  isHeart,
  setIsHeart,
  items,
}) {
  
  // const [commentState, setCommentState] = useState("");
  // const [commented, setCommented] = useState(false);
  // const [comment, setComment] = useState({});
  // const handleAdd = (comment) => {
  //   setComment(comment);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setCommented(!commented);
  //   const comment = {
  //     comment: commentState,
  //   };
  //   handleAdd(comment);
  //   setCommentState("");
  // };

  const [array, setArrayData] = useState([]);
  const [commentState, setCommentState] = useState("");
  const addDataToTheArray = () => {
    setArrayData((prevState) => [...prevState, commentState]);
    console.log(array);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCommentState("");
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  };

  const iconStyle = {
    fontSize: "26px",
    cursor: "pointer",
  };

  const buttonStyle = {
    marginLeft: "300px",
  };
  return (
    <div>
      <div className="container" style={containerStyle}>
        <div className="icon" style={iconStyle}>
          <AiOutlineLike
            onClick={() => {
              setLike(isLiked ? like - 1 : like + 1);
              setIsLiked(!isLiked);
            }}
          />
        </div>
        <div className="icon" style={iconStyle}>
          <FcLike
            onClick={() => {
              setHeart(isHeart ? heart - 1 : heart + 1);
              setIsHeart(!isHeart);
            }}
          />
        </div>
        <div className="icon" style={iconStyle}>
          <GoComment />
        </div>
      </div>

      {/* comment component */}
      <form onSubmit={handleSubmit}>
        <div className="post">
          <div className="postWrapper">
            <div className="shareTop">
              <img className="profilePicture" src={items.picture} alt="" />
              <input
                placeholder="Write a comment...."
                className="shareInput"
                onChange={(e) => {
                  setCommentState(e.target.value);
                }}
              />
              <Button
                type="submit"
                disabled={!commentState}
                variant="outline-secondary"
                size="sm"
                style={buttonStyle}
                onClick={addDataToTheArray}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
      {/* {users.map((user) => (
                <UserSuggestion key={user.id} userdata={user} />
              ))} */}
      {/* {commented ? <CommentBox items={items} comment={comment} /> : null} */}
      {array.map((arr, index) => (
        <CommentBox key={index} userdata={arr} items={items} />
      ))}
    </div>
  );
}

export default CreatePostBottom;


