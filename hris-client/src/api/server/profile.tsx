import axios from "axios";

export const requestProfileToServer = async (userId: string) => {
  const serverUrl = process.env.SERVER_URL || "http://localhost:3001";
  
  const url = `${serverUrl}/profile`;
  const reqBody = { userId };
  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(url, reqBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error(error);
    return 500;
  }
};
