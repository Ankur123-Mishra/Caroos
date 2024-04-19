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
            {/* <div className="col-md-6 mt-md-5 mb-2">
              <div class="card p-3 mt-3">
                <div class="card-body">
                  <h3 class="card-title fw-bold">
                    Enquire about our <br /> services.
                  </h3>
                  <div className="d-flex flex-column flex-md-row justify-content-between">
                    <div className="nameField">
                      <p className="m-2">Name</p>
                      <input type="text" placeholder="Arlene D. Wiles" />
                    </div>
                    <div className="nameField">
                      <p className="m-2">Email</p>
                      <input type="text" placeholder="you@gmail.com" />
                    </div>
                  </div>
                  <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
                    <div className="nameField">
                      <p className="m-2">Your phone no.</p>
                      <input type="text" placeholder="Number" />
                    </div>
                    <div className="nameField">
                      <p className="m-2">Services</p>
                      <select name="" id="">
                        <option value="">Select Services</option>
                        <option value="">Paint protection film</option>
                        <option value="">Coating</option>
                        <option value="">Denting</option>
                      </select>
                    </div>
                  </div>
                  <div className="getButton mt-5">
                    <button>Get quote</button>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-5 mt-md-5 mb-2">
              <div className="card p-3 mt-3">
                <div className="card-body">
                  <h3 className="card-title fw-bold">
                    Enquire about our <br /> services.
                  </h3>
                  <div className="d-flex justify-content-between gap-2">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control w-100"
                        id="name"
                        placeholder="Arlene D. Wiles"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control 100"
                        id="email"
                        placeholder="you@gmail.com"
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between gap-2 mt-3">
                    <div className="form-group">
                      <label htmlFor="phone">Your phone no.</label>
                      <input
                        type="text"
                        className="form-control w-100"
                        id="phone"
                        placeholder="Number"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="services">Services</label>
                      <select style={{width:"215px"}} className="form-control" id="services">
                        <option value="">Select Services</option>
                        <option value="">Paint protection film</option>
                        <option value="">Coating</option>
                        <option value="">Denting</option>
                      </select>
                    </div>
                  </div>
                  <div className="getButton mt-4">
                    <button>Get quote</button>
                  </div>
                </div>
              </div>
            </div> */}

<div className="col-md-5 mt-md-5 mb-2">
      <div className="card p-3 mt-3">
        <div className="card-body">
          <h3 className="card-title fw-bold">
            Enquire about our <br /> services.
          </h3>
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
            <div className="col mt-4">
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
