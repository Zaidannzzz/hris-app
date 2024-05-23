import axios from "axios";

export const requestRegisterToServer = async (name: string, email: string, password: string, role: string, position: string, department: string) => {
  const serverUrl = process.env.SERVER_URL || "http://localhost:3001";
  const url = `${serverUrl}/register`;
  
  const reqBody = {
    name,
    email,
    password,
    role,
    position,
    department
  }

  try {
    //using axios
    const response = await axios.post(url, reqBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseStatus = response.status;
    //return status from server
    return responseStatus;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const requestLoginToServer = async (email: string, password: string) => {
  const serverUrl = process.env.SERVER_URL || "http://localhost:3001";
  const url = `${serverUrl}/login`;
  const reqBody = {
    email,
    password
  }

  try {
    //using axios
    const response = await axios.post(url, reqBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const token = response.data.token
    localStorage.setItem('token', token);
    const userId = response.data.userId
    localStorage.setItem('userId', userId);
    const responseStatus = response.status;
    //return status from server
    return responseStatus;
  } catch (error) {
    console.log(error);
    return 500;
  }
}
