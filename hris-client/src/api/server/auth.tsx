import axios from "axios";
import * as bcrypt from "bcryptjs";

export const requestRegisterToServer = async (name: string, email: string, password: string, role: string) => {
  const url = process.env.SERVER_URL! + '/register';
  const reqBody = {
    name,
    email,
    password,
    role
  }

  const token = bcrypt.hashSync(process.env.REACT_APP_SERVER_TOKEN!, 10);
  try {
    //using axios
    const response = await axios.post(url, reqBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`,
      },
    });
    //convert response to json
    const responseJson = await response.data;
    //return email
    return responseJson.email;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export const requestLoginToServer = async (email: string, password: string) => {
  const url = process.env.SERVER_URL! + '/login';
  const reqBody = {
    email,
    password
  }

  const token = bcrypt.hashSync(process.env.REACT_APP_SERVER_TOKEN!, 10);
  try {
    //using axios
    const response = await axios.post(url, reqBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`,
      },
    });
    //convert response to json
    const responseJson = await response.data;
    //return email
    return responseJson.email;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}