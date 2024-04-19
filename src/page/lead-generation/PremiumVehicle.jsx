import React from "react";
import "./Lead.css";
import lastImage from "../../asets/Group 23.jpg";
import { Link } from "react-router-dom";

const MultiCards = ({ title, header, btn, demo}) => {
  return (
    <>
        <div className={`card multi ${demo}`} style={{height:"230px", width:"420px"}}>
          
            <div class="card-body">
              <h6 class="card-subtitle opacity-75">{title}</h6>
              <h5 class="card-title headers fw-bold mt-2">{header}</h5>
              <button className="explore-btn fw-bold">
                {btn} <i class="bi bi-arrow-right"></i>
              </button>
            </div>
        </div>
      
    </>
  );
};

const PremiumVehicle = () => {


  return (
    <>
      <div className="container mb-3">
        <div className="second-content">
          <p>
            Driving Perfection with Premium <br /> Vehicle Protection Services
          </p>
        
          <div className="row">
            <div className="col-md-4">
              <Link to="/services/detailing">
                <MultiCards title="SERVICES" header="Detailing" btn="Explore Now" demo="multicards"/>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/services/paint-protection">
                <MultiCards title="SERVICES" header="Paint Protection" btn="Explore Now" demo="about"/>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/services/denting-and-painting">
                <MultiCards title="SERVICES" header="Denting & Painting" btn="Explore Now" demo="last"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <img src={lastImage} alt="" srcset="" className="w-100" />
       
      </div>
    </>
  );
};

export default PremiumVehicle;
