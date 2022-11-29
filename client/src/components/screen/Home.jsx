import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import jwt from "jsonwebtoken";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const usertoken = localStorage.getItem("token");
    // console.log(usertoken);
    if (!usertoken) {
      navigate("/login");
    }
    if (usertoken) {
      // const user = jwt.verify(usertoken);
      // console.log(usertoken);
    }
  }, []);

  return <div>home</div>;
};

export default Home;
