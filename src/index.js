import React from "react";
import ReactDOM from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import AuthProvider from "./AuthProvider";

import AddCarProvider from "./context/AddCarProvider";
import CartProvider from "./context/CartProvider";
import ProfileProvider from "./context/ProfileProvider";
import ServicesProvider from "./context/ServicesProvider";
import UserAddressProvider from "./context/UserAddressProvider";
import PaymenttProvider from "./context/PaymentProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ServicesProvider>
        <UserAddressProvider>
          <ProfileProvider>
            <AddCarProvider>
              <CartProvider>
                <PaymenttProvider>
                  <App />
                </PaymenttProvider>
              </CartProvider>
            </AddCarProvider>
          </ProfileProvider>
        </UserAddressProvider>
      </ServicesProvider>
    </AuthProvider>
  </BrowserRouter>
);
