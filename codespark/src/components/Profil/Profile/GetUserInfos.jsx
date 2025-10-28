import { useEffect, useState } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const GetUserInfos = () => {
  const [userInfo, setuserInfo] = useState(null); // Changed from [] to null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserInfoFromdb = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); 

        if (!token) {
          console.log("No token found");
          setLoading(false);
          return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const res = await axios.get(
          `http://localhost:3001/getUserInfoFromdb/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setuserInfo(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getUserInfoFromdb();
  }, []); // Empty array - only run once on mount

  return { userInfo, loading, error };
};

export default GetUserInfos;