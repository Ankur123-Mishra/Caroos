//import { useState } from "react"
import { useContext, useEffect, useState } from "react";
import Toast from "./Tost";
import Axios from "./Axios";
import { AuthContext } from "./AuthProvider";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
      //     window.alert('You are offline, failed to load the resources.')
    };
    document.body.appendChild(script);
  });
};

const DisplayRazorpay = async (amount) => {
  const [paymentId, setPaymentId] = useState("");
  const { userToken } = useContext(AuthContext);

  const HandleUpdateOrder = async () => {
    if (paymentId) {
      try {
        const response = await Axios.post(
          `/update-order?payment_status=1&payment_id=${paymentId}`
        );

        if (response.status === 200) {
          const data = response.data;
          // Toast(data.message,response.status)
          console.log("paymentid", data);
        }
      } catch (err) {
        const error = err?.response?.data;
        Toast(error.message);
      }
    }
  };

  useEffect(() => {
    HandleUpdateOrder();
  }, [paymentId]);

  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("You are offline, failed to load the resources.");
    return;
  }

  const options = {
    description: "Order fees",
    // image: 'https://i.imgur.com/3g7nmJC.png',
    image: "https://i.imgur.com/3g7nmJC.png",
    currency: "INR",
    key: "rzp_test_7JFMstTaZGMnre", // Your api key
    amount: amount * 100, //amount in paise
    name: "caross",
    description: "Thanks for purchasing",
    // prefill: {
    //     email: userData?.email,
    //     contact: userData?.mobile,
    //     name: userData?.name
    // },
    theme: { color: "#e2bc3f" },
    handler: (response) => {
      // alert(response.razorpay_payment_id)

      alert(response.razorpay_payment_id);
      setPaymentId(response.razorpay_payment_id);
      Toast("payment successful", 200);

      //  update_order(order?.id,response.razorpay_payment_id,1,type)
    },
    prefill: {
      name: "caross",
    },
  };
  const paymentobj = new window.Razorpay(options);
  // paymentobj.on('payment.failed', (response) => {
  //     update_order(order?.id,response.error.metadata.payment_id,2,type)

  // })
  paymentobj.open();

  return;
};

export default DisplayRazorpay;
