import React from "react";
// import carClean from "../../asets/carsClean.jpg";
import carClean from "../../asets/carClean.jpg";
import "./Lead.css";
import PremiumVehicle from "./PremiumVehicle";

const LeadGeneration = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${carClean})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "90vh",
        }}
      >
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-7 mt-md-5">
              <div className="content">
                <h1 className="mt-5">
                  Preservation
                  <br /> Perfected: PPF
                  <br /> Craftsmanship
                  <br /> <span className="yourcar">CAROSS</span>
                </h1>
                <p>
                  We believe in providing top quality workmanship and are so
                  confident in our level of service that we back it up with a
                  good quality.
                </p>
              </div>
            </div>
  

<div className="col-md-5 mt-md-5 mb-2">
      <div className="card p-3 mt-3">
        <div className="card-body">
          <h3 className="card-title fw-bold">
            Enquire about our services.
          </h3>
          <form>
            <div className="row">
              <div className="col mt-3">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Arlene D. Wiles"
                  />
                </div>
              </div>
              <div className="col mt-3">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@gmail.com"
                  />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="phone">Your phone no.</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Number"
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="services">Services</label>
                  <select className="form-control" id="services">
                    <option value="">Select Services</option>
                    <option value="">Paint protection film</option>
                    <option value="">Coating</option>
                    <option value="">Denting</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="getButton mt-4">
              <button>Get quote</button>
            </div>
          </form>
        </div>
      </div>
    </div>
          </div>
        </div>
      </div>

      <PremiumVehicle />
    </>
  );
};

export default LeadGeneration;
