import { HashRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Homepage from "./page/homepage/Homepage";
import Login from "./page/auth-pages/Login";
import Services from "./page/services/Services";
import EnterOTP from "./page/auth-pages/enter-otp/EnterOTP";
import AddNewCar from "./page/services/add-car/AddNewCar";
import ServiceCard from "./components/ServiceCard";
import AddedCart from "./page/added-cart/AddedCart";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import MyAccount from "./page/my-account/MyAccount";
import EditDetails from "./page/my-account/EditDetails";
import MyCars from "./page/my-account/MyCars";
import MyOrders from "./page/my-account/MyOrders";
import UserAddress from "./page/my-account/user-address/UserAddress";
import PrivateRoute from "./PrivateRoutes";

import ScrollToTop from "./ScrollToTop";
import ContactUs from "./page/footer-page/ContactUs";
import AboutUs from "./page/footer-page/AboutUs";
import Blog from "./page/footer-page/Blog";
import InsPection from "./page/footer-page/InsPection";
import Parking from "./page/footer-page/Parking";
import Partners from "./page/footer-page/Partners";
import PreDelivery from "./page/footer-page/PreDelivery";
import Rsa from "./page/footer-page/Rsa";
import Locator from "./page/footer-page/Locator";
import Workshop from "./page/footer-page/Workshop";
import EnquiryForFrenchise from "./page/footer-page/EnquiryForFrenchise";
import CancellationAndRefundPolicy from "./page/footer-page/CancellationAndRefundPolicy";
import ShippingAndDeliveryPolicy from "./page/footer-page/ShippingAndDeliveryPolicy";
import TermAndCondition from "./page/footer-page/TermAndCondition";
import PrivacyPolicy from "./page/footer-page/PrivacyPolicy";
import MyOrderChild from "./page/my-account/MyOrderChild";
import HandleNavbar from "./components/HandleNavbar";
import FloatingCart from "./components/FloatingCart";
import MyCoupons from "./page/my-account/my-coupons/MyCoupons";
import Maintenance from "./page/maintenance/Maintenance";
import OrderPlacedSuccessfully from "./OrderPlacedSuccessfully";


function App() {
  return (
    <>
    <HashRouter>
    <HandleNavbar />
    <ScrollToTop/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/enter-otp" element={<EnterOTP/>} />
        <Route path="/" element={<Homepage/>} />       
        <Route path="/my-details" element={<PrivateRoute Component={EditDetails}/>} />
        <Route path="/my-cars" element={<PrivateRoute Component={MyCars}/>} />
        <Route path="/my-orders" element={<PrivateRoute Component={MyOrders}/>} />
          {/* <Route path="/my-orders/:id" element={<PrivateRoute Component={MyOrderChild} />}/>
        </Route> */}
        <Route path="/my-account" element={<PrivateRoute Component={MyAccount}/>} />
        <Route path="/services" element={<Services/>}>
        <Route path="/services/:id" element={<ServiceCard/>} />
        </Route>
        <Route path="/my-coupons" element={<PrivateRoute Component={MyCoupons}/>} />
        <Route path="/order-placed-successfully" element={<PrivateRoute Component={OrderPlacedSuccessfully}/>} />
        <Route path="/maintenance" element={<PrivateRoute Component={Maintenance}/>} />
        <Route path="/address" element={<PrivateRoute Component={UserAddress}/>} />
        <Route path="/add-new-car" element={<PrivateRoute Component={AddNewCar}/>} />
        <Route path="/cart" element={<PrivateRoute Component={AddedCart}/>} />
        <Route path="/blogs" element={<Blog/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />

        <Route path="/inspection" element={<InsPection/>} />
        <Route path="/locator" element={<Locator/>} />
        <Route path="/parking" element={<Parking/>} />
        <Route path="/partners" element={<Partners/>} />
        <Route path="/pre-delivery-inspection" element={<PreDelivery/>} />
        <Route path="/rsa" element={<Rsa/>} />
        <Route path="/enquiry-for-franchise" element={<EnquiryForFrenchise/>} />
        <Route path="/workshop-locator" element={<Workshop/>} />

        <Route path="/contact-us" element={<ContactUs/>} />
        <Route path="/cancellation-and-refund-policy" element={<CancellationAndRefundPolicy/>} />
        <Route path="/shipping-and-delivery-policy" element={<ShippingAndDeliveryPolicy/>} />
        <Route path="/term-and-conditions" element={<TermAndCondition/>} />

        {/* <Route path="/add-to-cart" element={<Login/>} /> */}
      </Routes>
      <Footer/>
      <FloatingCart/>
    </HashRouter>
    {/* float cart */}
    
      {/* tost */}
      <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
     </>
  );
}

export default App;
