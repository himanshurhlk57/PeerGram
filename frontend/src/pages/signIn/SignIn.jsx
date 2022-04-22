import React from "react";
import "./SignIn.css";
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleFailure = (result) => {
    alert(result);
  };

  //  send AJAX request to the backend
  const handleLogin = async (googleData) => {
    const res = await fetch("/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  const navigate = useNavigate();

  const handleMove = () => {
    navigate("/feeds");
  };

  return (
    <>
      <section className="form my-4 mx-5">
        <div className="container zone">
          <div className="row zone1">
            <div className="col-lg-5">
              <img
                src="/assets/images/logo.png"
                className="img-fluid ps-3"
                alt="icon"
                style={{
                  borderRadius: "50px",
                  width: "400px",
                  marginBottom: "20px",
                }}
              />
              <h5
                className="heading5 ps-4 ps-lg-3"
                style={{ fontFamily: "cursive", marginLeft: "20px" }}
              >
                Enter your details and <br /> start your journey with us 🙂
              </h5>
            </div>
            <div className="col-lg-7">
              <h1 className="fw-bold py-3 ps-3">Login</h1>
              {loginData ? (
                <div>
                  <h3 className="email ps-3">
                    You logged in as{" "}
                    <span style={{ color: "red" }}>{loginData.name}</span>
                  </h3>
                  <button onClick={handleLogout} className="btn btn-dark m-3">
                    Logout
                  </button>

                  <button
                    onClick={handleMove}
                    className="btn btn-outline-success m-3"
                  >
                    Proceed
                  </button>
                </div>
              ) : (
                <>
                  <form>
                    <div className="form-row">
                      <div className="col-lg-7">
                        <HiOutlineMail size={30} />
                        <input
                          type="email"
                          placeholder="Email-Address"
                          className="FormControl zone2 my-3 p-2 mx-4"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-lg-7">
                        <FaLock size={30} />
                        <input
                          type="password"
                          placeholder="Password"
                          className="FormControl zone2 my-3 p-2 mx-4"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-lg-7">
                        <button type="button" className="btn1 mt-3 mb-5">
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-7 mx-5">
                      <p>Don't have an account?</p>
                    </div>
                    <div className="mx-5 my-3">
                      <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Log in with Google"
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={"single_host_origin"}
                      ></GoogleLogin>
                    </div>
                  </form>{" "}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;
