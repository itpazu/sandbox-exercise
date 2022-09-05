import axios from 'axios';

const BASIC_URL = 'http://localhost:5000';

export const uploadFileToSever = async ({ file }) => {
  const { data } = await axios.post(`${BASIC_URL}/upload`, file);
  return data;
};

export const scanFile = async (id) =>
  await axios.get(`${BASIC_URL}/analysis/${id}`);
