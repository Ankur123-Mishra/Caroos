import React, { useState } from "react";
// import carClean from "../../asets/carsClean.jpg";
import carClean from "../../asets/carClean.jpg";
import "./Lead.css";
import PremiumVehicle from "./PremiumVehicle";

const LeadGeneration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        "https://caross.in/api/user/send-enquiry-mail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            service,
            message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send enquiry");
      }

      setSuccess(true);
    } catch (error) {
      setError("Failed to send enquiry");
    } finally {
      setLoading(false);
      setName("");
      setEmail("");
      setPhone("");
      setService("");
    }
  
  };

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
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col mt-3">
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Arlene D. Wiles"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="services">Services</label>
                          <select
                            className="form-control"
                            id="services"
                            onChange={(e) => setService(e.target.value)}
                          >
                            <option value="">Select Services</option>
                            <option value="pain-protection">
                              Paint protection film
                            </option>
                            <option value="coating">Coating</option>
                            <option value="denting">Denting</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* <div className="getButton mt-4">
              <button>Get quote</button>
            </div> */}
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {success && (
                      <p className="text-success">Enquiry sent successfully!</p>
                    )}
                    <button type="submit" className="getButton">
                      Get quote
                    </button>
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
