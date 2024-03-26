import { createContext, useState } from "react";




export const PaymentContext = createContext();

const PaymenttProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false)
 //const [totlaPrice, setTotalPrice] = useState(0)

 return (
    <PaymentContext.Provider value={{order, setOrder, loading, setLoading}}>
      {children}
    </PaymentContext.Provider>
  );

}

export default PaymenttProvider;