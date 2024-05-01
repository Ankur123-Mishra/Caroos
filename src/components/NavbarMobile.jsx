import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import brandlogo from "../asets/logo.png";
import Login from "../page/auth-pages/Login";
import { AuthContext } from "../AuthProvider";
import { CartContext } from "../context/CartProvider";
import Axios from "../Axios";
import { IconButton } from "@mui/material";
import Toast from "../Tost";
import CloseIcon from "@mui/icons-material/Close";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

function NavbarMobile() {
  const { cart, setCart } = useContext(CartContext);
  const { userToken, setUserToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAboveMessageShow, setIsAboveMessageShow] = useState(false);
  const [path, setPath] = useState(false);
  const [useOverlay, setUseOverlay] = useState(false);
  const [brandLogo, setBrandLogo] = useState("");

  const getBrandLogo = async () => {
    setIsLoading(true);
    try {
      const response = await Axios.get("/get-logo");
      if (response.status === 200) {
        const data = response?.data;
        setBrandLogo(data?.logo);
        console.log("logo", data);
      }
    } catch (err) {
      const error = err.response.data;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBrandLogo();
  }, []);
  const onLogout = async () => {
    setIsLoading(true);
    try {
      const response = await Axios.get("/logout", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.status === 200) {
        const data = response?.data;
        if (data) {
          localStorage.removeItem("userToken");
          setUserToken("");
          setCart(0);
          localStorage.removeItem("cart");
        }
        Toast(data?.message, response.status);
        navigate("/");
      }
    } catch (err) {
      const error = err.response.data;
      Toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      location.pathname === "/services" &&
      location.pathname === "/services/detailing" &&
      location.pathname === "/services/paint-protection" &&
      location.pathname === "/services/denting-and-painting" &&
      location.pathname === "/services/services" &&
      location.pathname === "/services/accessories"
    ) {
      setPath(true);
    } else {
      setPath(false);
    }

    if (location.pathname === "/") {
      setIsAboveMessageShow(true);
    } else {
      setIsAboveMessageShow(false);
    }
  }, [location.pathname]);

  const onCartClick = () => {
    if (userToken) {
      if (cart.length) {
        navigate("/cart");
      } else {
        Toast("Please add items into your cart", 200);
      }
    } else {
      Toast("Kindly Login", 200);
    }
  };
  const onOverlay = () => {
    setUseOverlay(!useOverlay);
  };

  return (
    <>
      <div className={isAboveMessageShow ? "nav-shadow m-0 p-0 " : null}>
        {isAboveMessageShow ? (
          <div
            className="row position-relative  w-100 m-0 p-0  "
            style={{
              position: "",
              background:
                "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 47%, rgba(252,176,69,1) 100%)",
              height: "30px",
            }}
          >
            <div
              onClick={() => navigate("/pre-delivery-inspection")}
              className="col-12 p-0 m-0 d-flex  align-items-center"
              style={{ cursor: "pointer" }}
            >
              {/* <p className='pt-2 ps-2' style={{fontSize:'10px', color:'white', fontWeight:'600',textAlign:'justify'}}>Buying a new car ? Don’t risk it.
        Get a free pre delivery inspection now  &nbsp;
          <Link to="/pre-delivery-inspection" style={{fontSize:'10px', color:'#b8242a'}}>Explore...</Link>
          </p>  */}
              <marquee
                className="text-center "
                style={{
                  fontSize: "0.7rem",
                  color: "white",
                  fontWeight: "400",
                }}
                behavior="scroll"
                direction="left"
                scrollamount="10"
              >
                Safety First, Always: Our Pre-Delivery Inspection Ensures It.
                Dive into the Details
              </marquee>
            </div>
            <div
              className=" d-flex justify-content-center align-items-center position-absolute"
              style={{
                width: "30px",
                height: "30px",
                right: "8px",
                zIndex: "99",
              }}
            >
              <IconButton
                onClick={() => setIsAboveMessageShow(false)}
                aria-label="delete"
                size="small"
              >
                <CloseIcon sx={{ color: "white" }} fontSize="inherit" />
              </IconButton>
            </div>
          </div>
        ) : null}

        <nav
          className={
            isAboveMessageShow
              ? "navbar bg-body-tertiary"
              : "navbar bg-body-tertiary fixed-top"
          }
          style={{ backgroundColor: "white" }}
        >
          <div className="container-fluid">
            <NavLink className="navbar-brand ms-md-3" to="/">
              <img
                src={brandLogo ? brandLogo : brandlogo}
                style={{ maxWidth: "180px" }}
                alt="Bootstrap"
                className="img-fluid"
              />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-start"
              style={{ minWidth: "50vw" }}
              tabindex="-1"
              data-bs-backdrop="false"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <NavLink
                  className="navbar-brand ms-md-3"
                  id="offcanvasNavbarLabel"
                  to="/"
                >
                  <img
                    src={brandLogo ? brandLogo : brandlogo}
                    alt="Bootstrap"
                    style={{ maxWidth: "180px" }}
                    className="img-fluid"
                  />
                </NavLink>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onOverlay}
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div
                className="offcanvas-body"
                style={{ backgroundColor: "white", zIndex: "99999" }}
              >
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                  <li
                    className="nav-item"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                  >
                    <NavLink className="nav-link nav-text" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li
                    className="nav-item"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                  >
                    <NavLink
                      className="nav-link nav-text"
                      to="/services/detailing"
                    >
                      Services
                    </NavLink>
                  </li>

                  {userToken ? (
                    <>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="/"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Profile
                        </a>
                        <ul className="dropdown-menu px-2">
                          <li
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                          >
                            <NavLink
                              className="nav-text d-flex justify-content-between align-items-center"
                              style={{ color: "black" }}
                              to="/my-details"
                            >
                              <span>My Details</span>{" "}
                              <i class="fa-solid fa-caret-right"></i>
                            </NavLink>
                          </li>
                          <li
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                          >
                            <NavLink
                              className="nav-text d-flex justify-content-between align-items-center"
                              style={{ color: "black" }}
                              to="/my-orders"
                            >
                              <span>Order Status</span>{" "}
                              <i class="fa-solid fa-caret-right"></i>
                            </NavLink>
                          </li>
                          <li
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                          >
                            <NavLink
                              className="nav-text d-flex justify-content-between align-items-center"
                              style={{ color: "black" }}
                              to="/my-cars"
                            >
                              <span>My Cars</span>
                              <i class="fa-solid fa-caret-right"></i>
                            </NavLink>{" "}
                          </li>
                          <li
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                          >
                            <NavLink
                              className="nav-text d-flex justify-content-between align-items-center"
                              style={{ color: "black" }}
                              to="/maintenance"
                            >
                              <span>Maintenance</span>{" "}
                              <i class="fa-solid fa-caret-right"></i>
                            </NavLink>
                          </li>
                          <li
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                          >
                            <NavLink
                              className="nav-text d-flex justify-content-between align-items-center"
                              style={{ color: "black" }}
                              to="/my-coupons"
                            >
                              <span>My Coupons</span>{" "}
                              <i class="fa-solid fa-caret-right"></i>
                            </NavLink>
                          </li>
                          <li
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                          >
                            <NavLink
                              className="nav-text d-flex justify-content-between align-items-center"
                              style={{ color: "black" }}
                              to="/my-orders"
                            >
                              <span>My Orders</span>{" "}
                              <i class="fa-solid fa-caret-right"></i>
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                      {userToken && (
                        <li
                          className="nav-item"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasNavbar"
                          aria-controls="offcanvasNavbar"
                        >
                          <a
                            className=" nav-text position-relative"
                            onClick={onCartClick}
                          >
                            <div class="cart-icon">
                              <i class="fas fa-shopping-cart"></i>
                              <span class="badge">
                                {cart.length ? cart.length : 0}
                              </span>
                            </div>
                          </a>
                        </li>
                      )}
                      <li
                        className="nav-item"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                      >
                        <button
                          onClick={onLogout}
                          className="nav-link nav-text"
                          to="/services/16"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Login />
                      </li>
                      <li className="nav-item mt-2">
                        <a
                          className="nav-text px-0 px-md-1  py-1"
                          href="tel:8929227077"
                        >
                          <i
                            class="fa-solid fa-phone-volume"
                            style={{ color: "#DE3820" }}
                          ></i>{" "}
                          8929227077
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavbarMobile;
