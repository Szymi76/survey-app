import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  //   const page = useLocation();
  //   console.log(page.search.);

  const navigate = useNavigate();
  navigate("/", {});
  return <div>Auth</div>;
};

export default Auth;
