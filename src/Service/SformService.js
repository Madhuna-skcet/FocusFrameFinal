import axios from "axios";

const url= 'http://localhost:8080/api/products';

export const createuser=(user)=>axios.post(url+'/post',user);