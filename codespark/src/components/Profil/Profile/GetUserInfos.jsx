
import { useEffect,useState } from "react"
import axios from 'axios'
import {jwtDecode} from "jwt-decode"



const GetUserInfos=()=>{

const[userInfo,setuserInfo]=useState([])




const getUserInfoFromdb=async()=>{

   try {
   const token = localStorage.getItem("token"); 

    if (!token) {
      console.log("No token found");
      return;
    }

    const decoded = jwtDecode(token);
    const userId = decoded.id;


    const res = await axios.get(`http://localhost:3001/getUserInfoFromdb/${userId}`,

        {
             headers:{Authorization:`Bearer ${token}`}
            }
    )

      
      setuserInfo(res.data)
   } catch (error) {
    console.log(error)
   }
    
}    

useEffect(() => { getUserInfoFromdb()  }, [setuserInfo])

return userInfo
}



export default GetUserInfos



