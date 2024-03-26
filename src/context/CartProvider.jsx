import { useState, createContext, useEffect } from "react";
import Axios from "../Axios";
import Toast from "../Tost";
//import { AuthContext } from "../AuthProvider";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false)
 const [totlaPrice, setTotalPrice] = useState(0)

 useEffect(()=>{
  let existingCart = localStorage.getItem("cart");
  if(existingCart) setCart(JSON.parse(existingCart))
},[])
//    add to cart
const handleAddToCart = async (product_id, userToken, type) =>{
      setLoading(true)
    try {
        const response = await Axios.post('/add-to-cart', {product_id, qty:1, type},{
         headers: {
             Authorization: `Bearer ${userToken}`
           }
        }); 
        if(response.status===200){
         const data = response?.data;
           setCart([...cart, data?.cart_items])
           localStorage.setItem("cart", JSON.stringify([...cart, data?.cart_items]))
           //console.log("cart...",cart);
         Toast(data?.message,response.status)            
        }               
       } catch (err) {
         const error = err?.response?.data
         Toast(error?.message)
       }finally{
         setLoading(false)
       }
}

// get all cart
const handleGetAllCart = async(userToken)=>{
    try {
        const response = await Axios.get('/cart-list', {
            headers: {
                Authorization: `Bearer ${userToken}`
              }
           }); 
           if(response.status===200){
            const data = response?.data;
              setCart(data?.cart_items)
              setTotalPrice(data?.total)
          //    console.log("cart...",data.cart_items);
            //Toast(data?.message,response.status)            
           }
       
    } catch (err) {
        const error = err?.response?.data
        // Toast(error.message)
    }finally{
        setLoading(false)
    }
}


// Remove from cart
const handleRemoveFromCart = async (product_id, userToken) =>{
    setLoading(true)
  try {
      const response = await Axios.post('/remove-cart', {product_id, qty:1},{
       headers: {
           Authorization: `Bearer ${userToken}`
         }
      }); 
      if(response.status===200){
       const data = response?.data;
        const updatedCart = cart.filter(val=>val?.product?.product_id!== product_id)
         setCart(updatedCart)
         localStorage.setItem("cart", JSON.stringify(updatedCart))
       Toast(data?.message,response.status)            
      }               
     } catch (err) {
       const error = err?.response?.data
       Toast(error.message)
     }finally{
       setLoading(false)
     }
}

  return (
    <CartContext.Provider value={{cart, totlaPrice,setTotalPrice, setCart, handleAddToCart, handleGetAllCart, handleRemoveFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
