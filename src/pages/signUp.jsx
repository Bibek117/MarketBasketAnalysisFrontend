import { FaUserNinja, FaEnvelope, FaLock } from "react-icons/fa6";
import "../styles/signUp.css";
import { useState } from "react";
import {api as apiCall} from "../config/axios.js";
import { handleError,handleSuccess } from "../utils/toast.js";
import { Link} from 'react-router-dom'
import { ToastContainer } from "react-toastify";


const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    shop_name: "",
    owner_name: "",
    address: "",
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    apiCall
      .post(
        "/auth/register",
        { ...formData },
      )
      .then((res) => {
        const rdata = res.data;
        if (rdata.success === true) {
          event.target.reset();
          setFormData({
            username: "",
            email: "",
            password: "",
            shop_name: "",
            owner_name: "",
            address: "",
          });
          handleSuccess(rdata.message)
        } else {
          console.log(res.data.message.errors)
          //handleError(rdata.message.errors[0].message); //TODO
        }
      })
      .catch((error) => {
         console.error("Error registering user:", error.message);
      // handleError(error.message);
      });
  };

  return (
    <>
      <div className="container-signup">
        <h3>Sign Up</h3>
        <div className="signup-container-form">
          <form onSubmit={handleRegister}>
            <div className="username-container">
              <label> Name:</label>

              <input
                type="text"
                placeholder="Enter your username"
                name="username"
                className="inputs-signup"
                value={formData.username}
                id="username"
                onChange={handleInputChange}
              />
            </div>
            <div className="email-container">
              <label>Email</label>{" "}
              <input
                type="email"
                placeholder="Enter your  email"
                name="email"
                className="inputs-signup"
                value={formData.email}
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="password-container">
              <label>Password </label>{" "}
              <input
                type="password"
                placeholder="Enter your passowrd"
                className="inputs-signup"
                value={formData.password}
                name="password"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="shopName">Shop name:</label>
              <input
                type="text"
                id="shopName"
                name="shop_name"
                value={formData.shop_name}
                placeholder="Your shop name"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="owner_name">Owner Name:</label>{" "}
              <input
                type="text"
                id="owner_name"
                name="owner_name"
                value={formData.owner_name}
                placeholder="Shop Owner name"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                placeholder="Enter Owner address"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <button className="btn-register" type="submit">
              Submit
            </button>
            <Link to="/guest/login">Login</Link>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default SignUp;
