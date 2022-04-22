import React, { useEffect, useState } from "react";
import "./feed.css";
import { Card, Button } from "react-bootstrap";
import CreatePostBottom from "./CreatePostBottom";

function Feed({ items, feed }) {
  const imgStyle = {
    position: "relative",
    left: "1px",
    width: "35px",
    borderRadius: "50%",
    height: "35px",
  };

  const [like, setLike] = useState(20);
  const [heart, setHeart] = useState(13);
  const [isLiked, setIsLiked] = useState(false);
  const [isHeart, setIsHeart] = useState(false);

  const admin = items.isAdmin;

  const dateInFormat = feed.postDate.split("T")[0];

  const deleteHandler = async()=>{
    try {
      const res = await fetch(`/api/feeds/${feed._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <>
        <Card className="mt-1 mb-4">
          <Card.Body>
            <Card.Img src={feed.usernameProfilePicture} style={imgStyle} />
            <span
              style={{
                marginLeft: "7px",
                position: "relative",
                bottom: "5px",
                fontWeight: "550",
              }}
            >
              {feed.username}
            </span>
            <div>
              <small
                style={{ position: "relative", left: "42px", bottom: "15px" }}
              >
                {dateInFormat}
              </small>

              {admin && (
                <Button
                  type="button"
                  onClick={deleteHandler}
                  style={{ position: "relative", left: "65%", bottom: "35px" }}
                  variant="danger"
                >
                  Delete
                </Button>
              )}
            </div>

            <Card.Text style={{ position: "relative", bottom: "10px" }}>
              {feed.caption}
            </Card.Text>
          </Card.Body>
          <Card.Img
            variant="bottom"
            src={feed.feedImage}
            // src="/assets/images/personImg.png"
            style={{
              width: "94%",
              // maxHeight: "310px",
              // maxHeight: "420px",
              height: "430px",
              position: "relative",
              left: "18px",
              bottom: "8px",
              borderRadius: "2%",
            }}
          />
          <div className="postButton">
            <div className="leftButton">
              <img className="icons" src="/assets/images/like.png" alt="" />
              <span className="likeCounter">{like}</span>
              <img
                style={{ marginLeft: "12px" }}
                className="icons"
                src="/assets/images/heart.png"
                alt=""
              />
              <span className="likeCounter">{heart}</span>
            </div>
            <div className="rightButton">
              <span className="commentText">3 comments</span>
            </div>
          </div>
          <CreatePostBottom
            like={like}
            heart={heart}
            setLike={setLike}
            setHeart={setHeart}
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            isHeart={isHeart}
            setIsHeart={setIsHeart}
            items={items}
          />
        </Card>
      </>
    </div>
  );
}

export default Feed;
