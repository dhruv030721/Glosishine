import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AppContext } from "../../App";

const cookies = new Cookies();

const SomeComponent = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  useEffect(() => {
    const token = cookies.get("Access-Token");
    if (!token || !user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return <div>{/* Your component code here */}</div>;
};

export default SomeComponent;
