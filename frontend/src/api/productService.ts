import axios from "axios";

export const getProducts = async () => {
  const res = await axios.get("http://localhost:3001/api/products");
  return res.data.data;
};
