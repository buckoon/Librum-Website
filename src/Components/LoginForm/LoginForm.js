import React, { useContext, useState } from "react";
import "./LoginForm.css";
import { FaEyeSlash, FaEye } from 'react-icons/fa'



import axios from "axios";

import { useNavigate, } from "react-router-dom";

import { SiteContext } from "../../Context/Context";
export const LoginForm = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regLogState, setRegLogState] = useState(true);
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();
  const { user, setUser, bg } = useContext(SiteContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);


  function isValidEmail(email) {
    // Email validation regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  const token = localStorage.getItem("token");

  if (token) {
    navigate("/profile");
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const register = async () => {
    if (displayName === "") {
      setErrorMessage("Please Enter your name");
      return;
    }
    if (registerEmail === "" || !isValidEmail(registerEmail)) {
      setErrorMessage("Please Enter a valid Email Address");
      return;
    }

    if (registerPassword.length > 6) {
      setErrorMessage("Password should be at least 6 characters");
    }

    if (registerPassword !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    const url = "https://librum-dev.azurewebsites.net/api/register";
    const data = {
      FirstName: displayName,
      LastName: lastName,
      Email: registerEmail,
      Password: registerPassword,
    };
    try {
      const headers = {
        "X-Version": "1.0",
      };
      const response = await axios.post(url, data, {
        headers,
      });

      console.log(response.data);

      // Registration successful
      console.log("Registration successful!");
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const login = async () => {
    const token = localStorage.getItem("token");
    console.log("clicked");
    // setLoading(true);
    const data = {
      Email: loginEmail,
      Password: loginPassword,
    };

    const headers = {
      "X-Version": "1.0",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.post(
        "https://librum-dev.azurewebsites.net/api/login",
        data,
        { headers }
      );
      console.log(response.data);
      localStorage.setItem("token", response.data);
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container">
      {regLogState ? (
        <div className="form-container login-form-container">
          <div
            className="log-form"
            style={
              bg === "light"
                ? {
                    backgroundColor: "white",
                    color: "var(--color-primary)",
                  }
                : {
                    backgroundColor: "#282c34",
                    color: "white",
                  }
            }
          >
            <div className="login-form-logo">
              <div className="login-form-logo-square" style={{ backgroundColor: bg === "light" ? "white" : "#302c2c" }}></div>
            </div>
            <div className="log-form-header">
              <h1 style={{ marginBottom: '5px' }}>Welcome back!</h1>
              <medium style={{  color: bg === "light" ? "black" : "#CBCBCB" }}>Log into your account</medium>
            </div>

            <div className="form-input">
              <div className="form-input-title" style={{ fontFamily: "'Lato', sans-serif", cursor: "default", color: bg === "light" ? "black" : "#CBCBCB" }}>
                Email
              </div>
              <div className="form-input-input">
                <input
                  type="email"
                  value={loginEmail ? loginEmail : ""}
                  name="Email"
                  onChange={(e) => {
                    setloginEmail(e.target.value);
                  }}
                  style={{
                   
                    color: bg === "light" ? "black" : "#CBCBCB",
                    outline: bg=== "light" ? "#DCDCE4":"#48484D",
                    borderColor: bg=== "light" ? "#DCDCE4":"#48484D",
                    
                  }}
                />
              </div>
            

            </div>

            <div className="form-input">
              <div className= "form-input-title"  style={{fontFamily: "'Lato', sans-serif", color: bg === "light" ? "black" : "#CBCBCB" }}>Password</div>
              <div className="form-input-input">
                <div className="icon" style={{ color: bg === "light" ? "black" : "#CBCBCB" }} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash/>:<FaEye/>}
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword ? loginPassword : ''}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                  }}
                  style={{
                    color: bg === "light" ? "black" : "#CBCBCB",
                    outline: bg=== "light" ? "#DCDCE4":"#48484D",
                    borderColor: bg=== "light" ? "#DCDCE4":"#48484D",
                  }}
                />
                
              </div>
            </div>

            <div className={`form-checkbox ${bg === "light" ? "light" : ""}`}>
              <div className="checkbox-unit">
                <input type="checkbox" />
                <span className="span-unit" style={{ fontFamily: "'Lato', sans-serif", cursor: "default", color: bg === "light" ? "black" : "#CBCBCB" }}>Remember me</span>
              </div>
              <span
                className="forgot-password"
                style={{
                  color: "#946bde",
                  fontFamily: "'Lato', sans-serif"
                }}
              >
                Forgot password?
              </span>
            </div>


            <button
              onClick={() => {
                login();
              }}
              className=" btn-login"
            >
              <span className="buttonspan">L{`ogin`}</span>
            </button>

             
          </div>

          <div className="login-register-cta">
           
            <span
              className="login-cta-text"
              onClick={() => {
                setRegLogState(false);
              }}
              
            >
              {" "}
              Don't have an account? {" "}Register{" "}
            </span>
          </div>
        </div>
      ) : (
        <div className="form-container">
          <div
            className="log-form"
            style={
              bg === "light"
                ? {
                    backgroundColor: "white",
                    color: "var(--color-primary)",
                  }
                : {
                    backgroundColor: "#282c34",
                    color: "white",
                  }
            }
          >
            <div className="log-form-header">
              <div className="login-form-logo">
                <div className="login-form-logo-square"style={{ backgroundColor: bg === "light" ? "white" : "#302c2c" }}></div>
              </div>
              <h2>Welcome</h2>
              <p  style={{  color: bg === "light" ? "black" : "#CBCBCB" }}>
                Your credentials are only used to authenticate yourself Your
                credentials will be stored in a secure database
              </p>
            </div>

            <div className="form-input reg">
              <div className="reg-form-name">
                {" "}
                <div className="form-input-title" style={{ fontFamily: "'Lato', sans-serif",color: bg === "light" ? "black" : "#CBCBCB" }}>First name</div>
                <div className="form-input-input">
                <input
                  style={{
                    borderColor: bg === "light" ? "#DCDCE4" : "#48484D",
                    color: bg === "light" ? "#CBCBCB" : "rgb(72,72,70)",
                  }}
                  type="text"
                  name="first-name"
                  value={displayName ? displayName : ""}
                  onChange={(e) => {
                    setdisplayName(e.target.value);
                  }}
                />

                </div>
              </div>

              <div className="reg-form-name">
                {" "}
                <div className="form-input-title" style={{ fontFamily: "'Lato', sans-serif",color: bg === "light" ? "black" : "#CBCBCB" }}>
                  Last name
                </div>

                <div className="form-input-input">
                  <input
                    type="text"
                    name="last-name"
                    value={lastName ? lastName : ""}
                    
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    style={{
                      color: bg === "light" ? "#DCDCE4" : "#48484D",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-input">
            <div
              className="form-input-title"
              style={{
                fontFamily: "'Lato', sans-serif",
                color: bg === 'light' ? 'black' : '#CBCBCB',
              }}
            >
              Email
            </div>
            <div className="form-input-input">
              <input
                type="text"
                name="name"
                style={{
                  color: bg === 'light' ? '#DCDCE4' : '#48484D',
                }}
              />
            </div>
          </div>

            <div className="form-input">
              <div className="form-input-title" style={{ fontFamily: "'Lato', sans-serif",color: bg === "light" ? "black" : "#CBCBCB" }}>Password </div>
              <div className="form-input-input">
                <div className="icon" style={{ color: bg === "light" ? "black" : "#CBCBCB" }} onClick={() => setShowPassword1(!showPassword1)}>
                  {showPassword1 ? <FaEyeSlash/>:<FaEye/>}
                </div>
                <input
                  style={
                    errorMessage === "Passwords don't match"
                      ? {
                          border: "2px solid crimson",
                        }
                      : { border: "none" }
                  }
                  type="password"
                  name="password"
                  value={registerPassword ? registerPassword : ""}
                  
                  onChange={(e) => {
                    setRegisterPassword(e.target.value);
                  }}
                  className="form-input-title"
                  style={{
                    color: bg === "light" ? "#DCDCE4" : "#48484D",
                  }}
                />
              </div>
            </div>

            <div className="form-input">
              <div className="form-input-title" style={{ fontFamily: "'Lato', sans-serif",color: bg === "light" ? "black" : "#CBCBCB" }}>Confirm password</div>
              <div className="form-input-input">
                <div className="icon" style={{ color: bg === "light" ? "black" : "#CBCBCB" }}  onClick={() => setShowPassword2(!showPassword2)}>
                  {showPassword2 ? <FaEyeSlash/>:<FaEye/>}
                </div>
                <input
                  style={
                    errorMessage === "Passwords don't match"
                      ? {
                          border: "2px solid crimson",
                        }
                      : { border: "none" }
                  }
                  type="password"
                  name="password"
                  value={confirmPassword ? confirmPassword : ""}
                  
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  style={{
                    color: bg === "light" ? "#DCDCE4" : "#48484D",
                  }}
                />
              </div>

              <div className="form-error">{errorMessage}</div>
            </div>

            <div className={`form-checkbox-register ${bg === "light" ? "light" : ""}`}>
              <div className="checkbox-unit">
                {" "}
                <input type="checkbox" /> <span

                style={{ fontFamily: "'Lato', sans-serif", cursor: "default" ,color: bg === "light" ? "black" : "#CBCBCB" }}
                
                
                >Stay informed about new features and improvements. </span> 
              </div>
              <div className="checkbox-unit">
                <input type="checkbox" /> 
                <span style={{ color: "#CBCBCB", fontFamily: "'Lato', sans-serif", cursor: "default", color: bg === "light" ? "black" : "#CBCBCB" }}>
                  I accept the&nbsp;
                  <a href="/termsofservice" style={{ color: "var(--color-primary1)" }}>Terms of Service</a>
                  &nbsp;and the&nbsp;
                  <a href="/privacypolicy" style={{ color: "var(--color-primary1)" }}>Privacy Policy</a>.
                </span>
              </div>


              
            </div>

            <button
              className="btn-login2"
              onClick={() => {
                register();
              }}
            >
              <span className="">L{`et's start`}</span>
            </button>
          </div>
          <div className="login-register-cta">
            
            <span
              onClick={() => {
              setRegLogState(true);
              }}
              style={{  cursor: "pointer" }}
              >
              {" "}
              Already have an account?{" "}{" "}Login{" "}
            </span>
                
          </div>
        </div>
      )}
    </div>
  );
};