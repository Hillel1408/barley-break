import axios from "axios";

const instance = axios.create({
    baseURL: "https://rt-sport-api.rt-expo-russia.workers.dev",
});

export default instance;
