import api, { convertToJSONString } from './Api';

export const loginUser = async (username, password) => {
  const obj = {
    username: username,
    password: password
  }
  return api.post('/login', convertToJSONString(obj));
}

export const registerUser = async ({ username, password, correo }) => {
  const obj = {
    username: username,
    password: password,
    correo: correo
  }
  return api.post('/register', convertToJSONString(obj));
}

export const logout = () => {
  localStorage.removeItem("user");
}

export const setUserContext = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
}

export const getUser = () => {
  const userJSON = localStorage.getItem("user");
  const user = JSON.parse(userJSON);
  return user;
}


export const restorePassword = async ({ correo }) => {
  const obj = {
    correo: correo,
  }
  return await api.post('/restore/password', convertToJSONString(obj));
}

export const changePassword = async ({ id, password, confirm_password }) => {
  const obj = {
    id: id,
    password: password,
    confirm_password: confirm_password,
  }
  return await api.put('/restore/password/change', convertToJSONString(obj));
}