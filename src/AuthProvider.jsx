import axios from "axios";
import {createContext,useEffect,useState} from "react";
import Cookies from 'js-cookie';
import Axios from "./Axios";
export const AuthContext = createContext()

const AuthProvider = ({children}) => {
   const [loadingall, setLoadingall ] = useState(false)
    // const [userToken, setUserToken] = useState()
    const [userToken, setUserToken] = useState("");
    const [userMobile, setUserMobile] = useState("");
    const [userInfo, setUserInfo] = useState("");
 
   //const navigate = useNavigate()


    useEffect(() => {
     // const Token = localStorage.getItem("userToken");
     const Token = Cookies.get('userToken');
      const Mobile = localStorage.getItem("userMobile");
      const Info = localStorage.getItem("userInfo");
      if (Token) {
       setUserToken(Token)
      }
      if(Mobile ){
         setUserMobile(Mobile)
      }
      if(Info){
        setUserInfo(Info)
      }
    }, []);
    
    
     

  return (
    <>
  <AuthContext.Provider value={{userToken, setUserToken, userMobile, setUserMobile, userInfo, setUserInfo}}>
        {children}
        </AuthContext.Provider>

    </>
  )
}
//const useAuth = () => useContext(AuthContext);
export default AuthProvider