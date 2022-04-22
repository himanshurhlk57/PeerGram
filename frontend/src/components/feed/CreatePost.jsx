import "./createPost.css";
import { MdPermMedia } from "react-icons/md";
import { useState, useRef } from "react";
import { ImCancelCircle } from "react-icons/im";

import { Button } from "react-bootstrap";

function CreatePost({ items }) {
  const [caption, setCaption] = useState("");

  const submitHandler = async () => {
    try {
      const response = await fetch("/api/feeds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caption: caption,
          username: items.firstName + " " + items.lastName,
          usernameProfilePicture: items.picture,
          feedImage: imageFile,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  /// image upload

  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [imageFile, setImageFile] = useState("");

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
        setImageFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const imgContainerCss = {
    padding: "0 10px 0px 10px",
    // position: "relative",
    marginTop: " 5px",
  };

  const imgCss = {
    width: "100%",
    objectFit: "cover",
    maxHeight: "400px",
  };

  const cancelCss = {
    position: "absolute",
    top: 0,
    right: 20,
    cursor: "pointer",
  };

  return (
    <>
      <form className="post" onSubmit={submitHandler}>
        <div className="postWrapper">
          <div>
            <img className="profilePicture" src={items.picture} alt="" />
            <label htmlFor="caption"></label>
            <input
              autoComplete="off"
              id="caption"
              type="text"
              name="caption"
              value={caption}
              placeholder="Start a post..."
              className="shareInput"
              onChange={(e) => {
                setCaption(e.target.value);
              }}
            />
          </div>
          {/* <label htmlFor="file" className="shareTop"> */}
          <div>
            <label htmlFor="file" className="shareTop">
              <MdPermMedia
                style={{
                  color: "green",
                  fontSize: "28px",
                  marginLeft: "40px",
                  marginRight: "7px",
                  cursor: "pointer",
                }}
                className="icon"
              />
              <small
                style={{
                  fontSize: "16px",
                  marginRight: "20px",
                  cursor: "pointer",
                }}
                className="iconText"
              >
                Photo/Video
              </small>
              <input
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{ display: "none" }}
              />
              <Button
                type="submit"
                style={{ marginRight: "10px" }}
                variant="success"
                size="sm"
              >
                Share
              </Button>
            </label>
          </div>
        </div>

        <div style={imgContainerCss}>
          <img style={imgCss} ref={uploadedImage} alt="" />
        </div>
        {/* <ImCancelCircle style={cancelCss} /> */}
      </form>
    </>
  );
}

export default CreatePost;
