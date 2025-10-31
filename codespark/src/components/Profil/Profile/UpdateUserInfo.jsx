import axios from "axios";

const useUpdateUserInfos = async(userData) => {


    try {


      const response = await axios.post(
        "http://localhost:3001/updateUserInfo",
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.data;
      
    } catch (err) {
      console.error("Error updating user info:", err);
      if (err.response) {
      return err.response; // Send back the full error response
    }
    }
    

     
  };



export default useUpdateUserInfos;
