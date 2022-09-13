import axios from 'axios';

const BASIC_URL = process.env.REACT_APP_SERVER_BASIC_URL;

export const uploadFileToSever = async ({ file }) => {
  const { data } = await axios.post(`${BASIC_URL}/upload`, file);
  return data;
};

export const scanFile = (id) => axios.get(`${BASIC_URL}/analysis/${id}`);

export const sendEmailToUser = (data) => {
  return axios.post(`${BASIC_URL}/email`, data);
};
