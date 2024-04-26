import axios from 'axios';
// import { useContext } from 'react';
// import {AuthContext} from './AuthProvider'



export default  axios.create({
    baseURL: "https://caross.in/admin/api/user/",
   
})
