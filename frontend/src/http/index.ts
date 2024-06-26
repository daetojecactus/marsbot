import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.APP_API_URL || "http://localhost:5000/";

const host = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export { host };
