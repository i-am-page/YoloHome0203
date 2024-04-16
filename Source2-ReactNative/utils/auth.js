import axios from "axios";

const API_KEY = "AIzaSyBRI3T5_3Ib4IyVer0dBWI420Fmag1Jl4E";

const authentication = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  console.log(1);
  console.log(response.data);

  const token = response.data.idToken;

  return token;
};

const createUser = (email, password) => {
  return authentication("signUp", email, password);
};

const login = (email, password) => {
  return authentication("signInWithPassword", email, password);
};

export { createUser, login };
