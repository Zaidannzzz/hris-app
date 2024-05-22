import axios from 'axios';

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${process.env.PORT}/auth/login`, { email, password });
  return response.data;
};

export const getProfile = async (token: string) => {
  const response = await axios.get(`${process.env.PORT}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
