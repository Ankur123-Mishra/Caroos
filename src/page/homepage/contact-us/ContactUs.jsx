import React, { useContext, useState } from "react";
import Toast from "../../../Tost";
import Axios from "../../../Axios";
import { AuthContext } from "../../../AuthProvider";
import Loader from "../../../Loader";

function ContactUs({ childRef }) {
  const [isLoading, setIsLoading] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    mobile: "",
    message: "",
  });
  const { userToken } = useContext(AuthContext);
  const handleContactUs = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await Axios.post("/contact", contactData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        const data = response?.data;
        Toast(data?.message, response.status);
        setContactData({ ...contactData, name: "", mobile: "", message: "" });
      }
    } catch (err) {
      const error = err?.response?.data;
      Toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div ref={childRef} className="container-fluid py-5" id="contactpage">
        <div
          className="container py-3 px-4 card-shadow rounded"
          style={{ backgroundColor: "#EDF5F9" }}
        >
          <div className="row">
            <div className="col-12 col-md-6 py-3">
              <h3 className="text-center py-3 text-md-start heading">
                <b className="red-t">Contact</b> Information
              </h3>
              <div className="row">
                <div className="col-12 py-3">
                  <a href="tel:8929227077">
                    <i
                      class="fa-solid fa-phone-volume"
                      style={{ color: "#b8242a" }}
                    ></i>{" "}
                    <span className="ms-3" style={{ color: "black" }}>
                      {" "}
                      +91 8929227077
                    </span>
                  </a>
                </div>
                <div className="col-12 py-3">
                  <a href="mailto:info@caross.in">
                    {" "}
                    <i
                      class="fa-solid fa-envelope"
                      style={{ color: "#b8242a" }}
                    ></i>{" "}
                    <span style={{ color: "black" }} className="ms-3">
                      {" "}
                      info@caross.in
                    </span>
                  </a>
                </div>
                <div className="col-12 py-3">
                  <a href="https://www.google.com/maps/place/CAROSS+DETAILING+STUDIO+%7C+GURGAON/@28.3985184,77.0762107,17z/data=!3m1!4b1!4m6!3m5!1s0x390d238737158797:0x40098e0aa8daa640!8m2!3d28.3985184!4d77.0762107!16s%2Fg%2F11vlpx_q7_?entry=ttu">
                    <i
                      class="fa-solid fa-location-dot"
                      style={{ color: "#DE3820" }}
                    ></i>
                    <span style={{ color: "black" }} className="ms-3">
                      Shop No 8 & 9, Plot No 25/1/1/1, opposite Dharam Tower,
                      Sector 65,{" "}
                      <span className="mx-4">Gurugram, Haryana 122102</span>
                    </span>
                  </a>
                </div>
                <div className="col-12">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.6870613700844!2d77.07621069999999!3d28.398518399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d238737158797%3A0x40098e0aa8daa640!2sCAROSS%20DETAILING%20STUDIO%20%7C%20GURGAON!5e0!3m2!1sen!2sin!4v1711537656215!5m2!1sen!2sin"
                    width="300"
                    height="200"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <h3 className="py-4 heading">
                <b className="red-t">Get In Touch</b> With Us
              </h3>
              <div className="row">
                <div className="col-12">
                  <form>
                    <div className="mb-3 d-flex flex-column flex-md-row">
                      <input
                        type="text"
                        value={contactData.name}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            name: e.target.value,
                          })
                        }
                        className="form-control me-md-3"
                        placeholder="Enter Full Name"
                        required
                      />
                      <input
                        type="number"
                        value={contactData.mobile}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            mobile: e.target.value,
                          })
                        }
                        className="form-control mt-3 mt-md-0"
                        placeholder="Enter Phone Number"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        value={contactData.message}
                        onChange={(e) =>
                          setContactData({
                            ...contactData,
                            message: e.target.value,
                          })
                        }
                        name=""
                        id=""
                        cols="12"
                        rows="4"
                        className="form-control"
                        placeholder="Enter Your Query"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={
                        !((contactData.name && contactData.mobile) || isLoading)
                      }
                      onClick={(e) => handleContactUs(e)}
                      className="red-btn red-btn-block"
                    >
                      {isLoading ? (
                        <>
                          <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Loading...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
