import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn/SignIn";
import SelfProfile from "./pages/selfprofile/SelfProfile";
import Body from "./components/body/Body";
import OtherProfile from "./pages/otherprofile/OtherProfile";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />}></Route>

          <Route
            path="/feeds"
            element={
              <>
                <NavBar />
                <Body />
              </>
            }
          ></Route>

          <Route
            path="/self-profile"
            element={
              <>
                <NavBar />
                <SelfProfile />
              </>
            }
          ></Route>

          <Route
            path="/user/other/:id"
            element={
              <>
                <NavBar />
                <OtherProfile />
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
