import React from "react";
import "./HomePage.css";
import Button from "../../components/Button/Button";

const HomePage = () => {
  return (
    <div className="home container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="title-text text-center">
        <h1>
          Startupers - Investing in the Future: a platform for OTC investments
          in promising startups
        </h1>

        <div className="description-text row justify-content-center mt-5">
          <div className="investors-text col-md-6 text-center">
            <h3 className="fs-4 fs-md-3 fs-lg-2">Investors</h3>
            <p className="fs-5 fs-md-4 fs-lg-3">
              Become a co-owner of a startup and earn above-average returns
            </p>
          </div>
          <div className="startupers-text col-md-6 text-center">
            <h3 className="fs-4 fs-md-3 fs-lg-2">Startups</h3>
            <p className="fs-5 fs-md-4 fs-lg-3">
              Place your offer on the platform to attract investors on favorable
              terms
            </p>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-md-6 text-center">
            <Button to="/startups">Buy startups</Button>
          </div>
          <div className="col-md-6 text-center">
            <Button to="/startups">Sell startups</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
