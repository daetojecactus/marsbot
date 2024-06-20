import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.APP_API_URL || "";

const host = axios.create({
  // baseURL: baseUrl,
  baseURL: 'http://localhost:5000/',
});

export { host };
