import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { motion } from "framer-motion";

import config from "../../config";
import styles from "./AdminLogin.module.css";

import ccsLogo from "../../Assets/CCS_logo.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies();
  const [loader, setLoader] = useState(false);

  
  // to check whether loggedIn or not
  
  const Vurl=config.apiurl+'/admin/verify';
  useEffect(() => {
      let token = cookies.AdminLoggedIn ;

      const isAdmin = async () => {
          const res = await axios.post(Vurl, {
            token: token,
          });
          if(res.data.status==true){
            navigate(config.adminRoute+'/apps');
          }
      };

      if (token != "") {
        isAdmin();
      }


    }, []);





    const createCookie = (name, value, days) => {
      const expires = new Date();
      expires.setDate(expires.getDate() + days);
    
      const cookieString = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
      document.cookie = cookieString;
    };






  // SUBMIT The CREDENTIALS
  const [msg, setMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [data, setData] = useState({
    Username: "",
    Password: "",
    Email: "",
    OTP: "",
  });







  const [email,showEmail]=useState(false);

  const url = config.apiurl + "/admin/signin";
  const submit = (e) => {
    e.preventDefault();
    setLoader(true);
    axios.post(url, data).then((res) => {

      let data = res.data;
      if (data.status === true) {
        
        setLoader(false);

        setMsg("Enter the Admin Email");
        showEmail(true);
        setTimeout(()=>{
          setMsg("");
        },3000)

      } 
      else {
        setLoader(false);
        setShowErr(true);
        setMsg("");
        setTimeout(()=>{
          setShowErr(false);
        },3000);
      }
    });
  };





  // SUBMITTING EMAIL
  const [otp,showOtp]=useState(false);

  const url2 = config.apiurl + "/admin/signin/email";
  const submitEmail = (e) => {
    e.preventDefault();
    setLoader(true);
    axios.post(url2, data).then((res) => {

      let data = res.data;
      if (data.status === true){

        setLoader(false);
        
        setMsg("OTP sent successfully!");
        showEmail(false);
        setTimeout(()=>{
          setMsg("");
        },3000)
        setTimeout(()=>{
          showOtp(true);
        },1000)

      } 
      else {
        setLoader(false);
        setShowErr(true);
        setMsg("");
        setTimeout(()=>{
          setShowErr(false);
        },3000);
      }
    });
  };

 
 
  // SUBMITTING OTP
  const url3 = config.apiurl + "/admin/signin/otp";
  const submitOTP = (e) => {
    e.preventDefault();
    setLoader(true);
    axios.post(url3, data).then((res) => {
      
      let data = res.data;
      console.log(data);
      if (data.status == true){
        createCookie("AdminLoggedIn", data.token, 7);
        navigate(config.adminRoute+'/dashboard');
      } 
      else {
        setLoader(false);
        setShowErr(true);
        setMsg("");
        setTimeout(()=>{
          setShowErr(false);
        },3000);
      }
    });
  };




  

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSide}>
        <img className={styles.logo} src={ccsLogo} alt="Logo" />
        <div className={styles.titleRecSys}>
          REGISTRATION
          <br />
          FORMS
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.rightTop}>
          <div className={styles.welcomeText}>HEY ADMIN!</div>
          <div className={styles.inputContainer}>
            <form onSubmit={(e) => {
              if(!email&&!otp){
                submit(e);
              }
              else if(email){
                submitEmail(e);
              }
              else if(otp){
                submitOTP(e);
              }
            }}>
              <input
                type="text"
                className={styles.passwordInput}
                placeholder="USERNAME"
                id="Username"
                value={data.Username}
                name="Username"
                required={true}
                onChange={(e) => handle(e)}
              />
              <input
                type="password"
                className={styles.passwordInput}
                placeholder="PASSWORD"
                id="Password"
                value={data.Password}
                name="Password"
                required={true}
                onChange={(e) => handle(e)}
              />
              {email&&(
                  <input
                    type="text"
                    className={styles.passwordInput}
                    placeholder="Admin Email"
                    id="Email"
                    value={data.Email}
                    name="Email"
                    style={{marginTop:"3%"}}
                    required={true}
                    onChange={(e) => handle(e)}
                  />
                )}
                  {otp&&(

                    <input
                    type="text"
                    className={styles.passwordInput}
                    placeholder="OTP"
                    id="OTP"
                    value={data.OTP}
                    name="OTP"
                    required={true}
                    onChange={(e) => handle(e)}
                  />
                
                )}
              <button className={styles.signinButton}>
                {loader && <span className={styles.loader}></span>}
                {!loader && <div>&#62;</div>}
              </button>
            </form>
          </div>
          {msg!="" && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className={styles.msg}
            >
              <h3>{msg}</h3>
            </motion.div>
          )}
          {showErr && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className={styles.err}
            >
              <h3>Incorrect Credentials !</h3>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
