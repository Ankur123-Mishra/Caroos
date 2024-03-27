import React from "react";
import DownLoadApp from "../homepage/download-app/DownLoadApp";
import { Helmet } from "react-helmet";

function ContactUs() {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Contact Caross.in for unparalleled auto detailing services. Whether you have questions, want to schedule an appointment, or discuss your specific needs, our friendly team is ready to assist you. Experience excellence in automotive care with Caross.in."
        ></meta>
      </Helmet>

      <div className="container-fluid nav-margin">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="my-3 py-3">
                <h3 className="red-t text-center">Contact Us</h3>
              </div>
              <p>
                Thank you for considering Caross Car Detailing and Denting
                Painting Studio for your automotive needs. We value your
                interest and are here to provide you with exceptional service
                and support. Feel free to get in touch with us using the
                following contact details:
              </p>

              <div>
                <h4>Contact Information</h4>

                <ul>
                  <li style={{ listStyleType: "initial" }}>
                    {" "}
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
                  </li>
                  <li style={{ listStyleType: "initial" }}>
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
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mt-3">Merchant Legal Entity Name:</h4>
                <p>ECOTIONS VENTURE PRIVATE LIMITED</p>
                <div className="row">
                  <div className="col-12 col-md-7">
                    <h4 className="mt-3">Registered Address:</h4>
                    <p>
                      D 52 Street No 8 Rajnagar 2 Palam Colony South West Delhi
                      DELHI 110077
                    </p>
                  </div>
                  <div className="col-12 col-md-4">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28003.583150875642!2d77.05214017431643!3d28.676245599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d05feaccc006f%3A0x247ab72f151e9b29!2sCAROSS%20DETAILING%20STUDIO!5e0!3m2!1sen!2sin!4v1696397201663!5m2!1sen!2sin"
                      height="140"
                      style={{ border: 0, maxWidth: "400px" }}
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
                <h4 className="mt-3">Operational Address:</h4>
                <p>SRS 227 School Road, Peeragarhi, West Delhi, 110087</p>
              
              </div>

              {/* <div>
              <h4>Business Ours</h4>
              <p>Monday: &nbsp; Saturday 9:00 pm To 8:00 am</p>
              <p>Sunday : &nbsp; Close</p>
            </div> */}
            </div>

            {/* <div>
          <h4>Connect With Us</h4>
          <p>Stay up to date with the latest news and automotive tips by following us on social media</p>
           <ul style={{listStyleType:'initial'}}>
            <li style={{listStyleType:'initial'}}>Facebook: &nbsp; Facebook.com</li>
            <li style={{listStyleType:'initial'}}> Instagram:&nbsp; Instgram.com</li>
            <li style={{listStyleType:'initial'}}>Youtube: &nbsp; Youtube.com</li>
           </ul>
        </div> */}

            {/* <div>
          <h4>How To Reach Us</h4>
          <p>Our studio is conveniently located in West Delhi, making it easily accessible from various parts of the city. If you have any questions, need assistance, or would like to schedule an appointment, please don't hesitate to contact us via phone or email. Our knowledgeable team is here to assist you and ensure your experience with Caross Car Detailing and Denting Painting Studio is nothing short of exceptional.</p>
        </div> */}
            <div>
              <p>
                Thank you for considering us for your car care needs. We look
                forward to serving you and making your vehicle shine like new
                again.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
      <DownLoadApp/>
     </div> */}
    </>
  );
}

export default ContactUs;
