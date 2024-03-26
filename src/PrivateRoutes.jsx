import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Login from "./page/auth-pages/Login";
import Toast from "./Tost";
import Cookies from "js-cookie";
//import { AuthContext } from "./AuthProvider";


export default function PrivateRoute(props) {
  const navigate = useNavigate()
  const {userToken} = useContext(AuthContext)
  //const [isLogin, setIsLogin] = useState(false)
  const {Component} = props
  
  useEffect(()=>{
    const getToken = Cookies.get('userToken');
    if(!getToken){
     
       navigate("/")
       Toast("Kindly Login", 200)
        
    }
  },[])
     
  return(
    <>
    {userToken?<Component/>:null}
     
      {/*  */}
    </>
  )
}
