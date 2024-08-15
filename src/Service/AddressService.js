// src/Service/service.js
import axios from "axios";

const url = 'http://localhost:8080/api/products';

export const PutAddress = (user,id) => axios.put(url+`/${id}`,user);
