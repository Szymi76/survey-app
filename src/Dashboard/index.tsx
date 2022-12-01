import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <section id="content-wrapper">
      <section id="content-header">
        <h1>Dashboard</h1>
        <div>
          <Link to={"/ustawienia"}>Ustawienia</Link>
          <Link to={"/dashboard"}>Dashboard</Link>
        </div>
      </section>
      <section id="content"></section>
    </section>
  );
};

export default Dashboard;
