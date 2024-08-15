// src/Service/service.js
import axios from "axios";

const url = 'http://localhost:8080/api/sellers';

export const createSeller = (seller) => axios.post(url+'/post',seller);
export const listSellers = () => axios.get(url);
