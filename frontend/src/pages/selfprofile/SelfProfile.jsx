import React, { useState, useEffect } from "react";
import "./SelfProfile.css";
import UserContact from "../../components/userContact/UserContact";
import UserSuggestion from "../../components/userSuggestion/UserSuggestion";

function SelfProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    websiteUrl: "",
    birthday: "",
    city: "",
    zip: "",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
  });

  const { firstName, lastName, websiteUrl, birthday, city, zip } = formData;

  const onChange1 = (e) => {
    const newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData(newData);
    console.log(newData);
  };

  const [radio, setRadio] = useState(false);

  const [state, setState] = useState([
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh	",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ]);

  const [stateValue, setStateValue] = useState("Andhra Pradesh");

  const handleState = (e) => {
    console.log(state[e.target.value]);
    setStateValue(state[e.target.value]);
  };

  const [designation, setDesignation] = useState([
    "Co-founder",
    "Deputy Manager",
    "Assistant Vice President",
    "Vice President",
    "Human Resource",
    "Technical Lead",
    "Associate Technical Lead",
    "Senior Software Engineer",
    "Software Engineer",
    "Trainee",
  ]);

  const [designationValue, setDesignationValue] = useState("Co-founder");

  const handleDesignation = (e) => {
    console.log(designation[e.target.value]);
    setDesignationValue(designation[e.target.value]);
  };

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  const [imageFile,setImageFile] = useState("");

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
        setImageFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem("loginData"))
  );

  const { id, email } = localData;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/data/${email}`, {
        method: "GET",
      });

      const data = await res.json();

      let date = data.birthday;
      date = date.split("T")[0];

      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        imageUrl: data.picture,
        websiteUrl: data.websiteUrl,
        birthday: date,
        city: data.city,
        zip: data.zip,
      });

      setRadio(data.gender);

      setIndex1(state.indexOf(data.state));
      if (index1 >= 0) {
        setStateValue(state[index1]);
      }

      setIndex2(designation.indexOf(data.designation));
      if (index2 >= 0) {
        setDesignationValue(designation[index2]);
      }
    }
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    // e.preventDefault();

    const res = await fetch(`/api/data/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        designation: designationValue,
        websiteUrl: websiteUrl,
        gender: radio,
        birthday: birthday,
        city: city,
        state: stateValue,
        zip: zip,
        base64EncodedImage: imageFile,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data);
  };

  const onReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      websiteUrl: "",
      birthday: "",
      city: "",
      zip: "",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1177/1177568.png",
    });

    setRadio(false);
    setDesignationValue("Co-founder");
    setIndex2(0);
    setStateValue("Andhra Pradesh");
    setIndex1(0);
  };

  
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

  
  return (
    <>
      <div className="container profilebg">
        <div className="row">
          <div className="col-xs-12 col-md-7 p-3 formbg my-4 ms-md-4">
            <div className="bgImage"></div>

            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                  display: "none",
                }}
              />
              <div
                style={{
                  height: "100px",
                  width: "100px",
                  borderRadius:"50%",
                  border: "1px dashed black",
                  marginTop:"-50px",
                  marginLeft: "20px"
                }}
                onClick={() => imageUploader.current.click()}
              >
                <img className="img-fluid"
                src={formData.imageUrl}
                  ref={uploadedImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius:"50%"
                  }}
                />
              </div>
              <span style={{color: "blue"}}>Click to upload Image</span> 
            </div>

            {/* <img
              src={formData.imageUrl}
              className="img-fluid profile-pic"
              alt="profilepic"
            /> */}

            <form className="row g-3" onSubmit={onSubmit}>
              <div className="col-md-5 mt-md-4">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  required
                  autoComplete="off"
                  minLength="3"
                  maxLength="50"
                  onChange={onChange1}
                  value={firstName}
                />
              </div>

              <div className="col-md-5 mt-md-4">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  required
                  autoComplete="off"
                  minLength="3"
                  maxLength="50"
                  onChange={onChange1}
                  value={lastName}
                />
              </div>

              <div className="col-md-5 mt-md-4">
                <label htmlFor="designation" className="form-label">
                  Designation
                </label>
                <select
                  id="inputDesignation"
                  className="form-select wrapper"
                  name="designation"
                  onChange={handleDesignation}
                >
                  {designation.map((des, key) => (
                    <option selected={index2 === key} key={key} value={key}>
                      {des}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-5 mt-md-4">
                <label htmlFor="websiteUrl" className="form-label">
                  My Website
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="websiteUrl"
                  name="websiteUrl"
                  placeholder="websiteUrl"
                  required
                  autoComplete="off"
                  minLength="5"
                  maxLength="255"
                  onChange={onChange1}
                  value={websiteUrl}
                />
              </div>

              <div className="col-md-4 mt-md-4">
                <label htmlFor="female" className="form-label">
                  Gender
                </label>
                <div className="row ms-1 ps-3 border border-1 genderrow">
                  <div className="form-check col-md-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="Female"
                      checked={radio === "Female"}
                      required
                      onChange={(e) => setRadio(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>

                  <div className="form-check col-md-3 ms-md-5">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="Male"
                      checked={radio === "Male"}
                      required
                      onChange={(e) => setRadio(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-md-1"></div>

              <div className="col-md-5">
                <label htmlFor="birthday" className="form-label">
                  Birthday
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  name="birthday"
                  value={birthday}
                  onChange={onChange1}
                  required
                  autoComplete="off"
                />
              </div>

              <div className="col-md-5">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  required
                  autoComplete="off"
                  minLength="3"
                  maxLength="50"
                  placeholder="City"
                  onChange={onChange1}
                  value={city}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="inputState" className="form-label">
                  State
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  name="state"
                  onChange={handleState}
                >
                  {state.map((st, key) => (
                    <option selected={index1 === key} key={key} value={key}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="zip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  required
                  autoComplete="off"
                  minLength="5"
                  maxLength="10"
                  placeholder="Zip code"
                  onChange={onChange1}
                  value={zip}
                />
              </div>

              <div className="col-md-3">
                <button
                  type="submit"
                  className="d-inline-block btn btn-primary px-md-4"
                >
                  Save
                </button>
              </div>

              <div className="col-md-3">
                <button
                  onClick={onReset}
                  type="button"
                  className="d-inline-block btn btn-outline-primary px-md-3"
                >
                  Reset All
                </button>
              </div>

              <div className="col-md-4"></div>
            </form>
          </div>

          <div className="col-xs-12 col-md-4 ps-md-5">
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
        </div>
      </div>
    </>
  );
}

export default SelfProfile;
