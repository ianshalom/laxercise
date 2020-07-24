import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://laxercise-82f65.firebaseio.com/",
});

export default instance;
