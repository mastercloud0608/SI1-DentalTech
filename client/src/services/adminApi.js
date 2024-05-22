import api, { convertToJSONString } from './Api';

/**
 * !Admin
 *      !dashboard
 */

export const getTimeLine = async () => {
  const { data } = await api.get('/admin/timeline');
  return data;
}

export const getUserCountDay = async () => {
  const { data } = await api.get('/admin/top_services');
  return data;
}


/**
 * !Admin
 *      !users
 */

export const createUser = async (users, { rol }) => {
  const obj = {
    users: users,
    rol: rol
  }
  await api.post('/admin/users/create', convertToJSONString(obj));
  await getAllUsersAdmin();
  await getTimeLine();
  await getUserCountDay();
  if (rol === 'odontologist') {
    await getListAllDiarysOdontologists();
  }
}

export const getAllUsersAdmin = async () => {
  const { data } = await api.get('/admin/users');
  return data;
}

export const getUserById = async (id) => {
  const transformId = id.queryKey[1];
  const { data } = await api.get(`/admin/user/${transformId}`);
  return data;
}

export const deleteUserById = async (id) => {
  await api.delete(`/admin/user/delete/${id}`);
  await getAllUsersAdmin();
  await getTimeLine();
  await getListAllDiarysOdontologists();
}

export const updateUser = async ({ id, username, nombre, apellido, correo, telefono, direccion, ci, rol, password }) => {
  const obj = {
    id: id,
    username: username,
    password: password,
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    telefono: telefono,
    direccion: direccion,
    ci: ci,
    rol: rol
  }
  await api.put('/admin/user/update', convertToJSONString(obj));
  await getAllUsersAdmin();
  await getTimeLine();
  await getListAllDiarysOdontologists();
}


/**
 * !Admin
 *    !Supplies
 */
export const getListAllSupplies = async () => {
  const { data } = await api.get('/admin/supplies');
  return data;
}

export const getSupplieById = async (id) => {
  const transformId = id.queryKey[1];
  const { data } = await api.get(`/admin/supplie/${transformId}`);
  return data;
}

export const deleteSupplieById = async (id) => {
  await api.delete(`/admin/supplie/delete/${id}`);
  await getListAllSupplies();
}

export const updateSupplie = async ({ id, nombre, cantidad, descripcion }) => {
  const obj = {
    id: id,
    nombre: nombre,
    cantidad: cantidad,
    descripcion: descripcion,
  }
  await api.put('/admin/supplie/update', convertToJSONString(obj));
  await getListAllSupplies();
}

export const createSupplie = async ({ nombre, cantidad, descripcion }) => {
  const obj = {
    nombre: nombre,
    cantidad: cantidad,
    descripcion: descripcion,
  }
  await api.post('/admin/supplie/create', convertToJSONString(obj));
  await getListAllSupplies();
}


/**
* !Admin
*    !Diarys
*/
export const getListAllDiarysOdontologists = async () => {
  const { data } = await api.get('/admin/diarys/odontologist');
  return data;
}

export const getDiaryOdontologistIdEspecialism = async (id) => {
  const { data } = await api.get(`/diary/odontologist/${id}`);
  return data;
}



/**
 * !Admin
 *      !Treataments
 */
export const getListTreatments = async () => {
  const { data } = await api.get('/admin/treatments');
  return data;
}

export const getTreatment = () => {
  const userJSON = localStorage.getItem("treatment");
  const treatment = JSON.parse(userJSON);
  return treatment;
}

export const createTreatment = async ({ nombre, costo, descripcion, duracion }) => {
  const obj = {
    nombre: nombre,
    costo: costo,
    descripcion: descripcion,
    duracion: duracion
  }
  await api.post('/admin/treatment/create', convertToJSONString(obj));
  await getListTreatments();
}

export const getTreatmentById = async (id) => {
  const transformId = id.queryKey[1];
  const { data } = await api.get(`/admin/treatment/${transformId}`);
  return data;
}

export const updateTreatment = async ({ id, nombre, costo, descripcion, duracion }) => {
  const obj = {
    id: id,
    nombre: nombre,
    costo: costo,
    descripcion: descripcion,
    duracion: duracion
  }
  await api.put('/admin/treatment/update', convertToJSONString(obj));
  await getListTreatments();
}

export const deleteTreatmentById = async (id) => {
  await api.delete(`/admin/treatment/delete/${id}`);
  await getListTreatments();
}


/**
 * !Admin
 *   !Medicine
 */
export const getListAllMedicine = async () => {
  const { data } = await api.get('/admin/medicines');
  return data;
}


export const getMedicine = () => {
  const userJSON = localStorage.getItem("medicine");
  const medicine = JSON.parse(userJSON);
  return medicine;
}

export const createMedicine = async ({ nombre, descripcion }) => {
  const obj = {
    nombre: nombre,
    descripcion: descripcion
  }
  await api.post('/admin/medicine/create', convertToJSONString(obj));
  await getListAllMedicine();
}

export const getMedicineById = async (id) => {
  const { data } = await api.get(`/admin/medicine/${id}`);
  return data;
}

export const updateMedicine = async ({ id, nombre, descripcion }) => {
  const obj = {
    id: id,
    nombre: nombre,
    descripcion: descripcion,
  }
  await api.put('/admin/medicine/update', convertToJSONString(obj));
  await getListAllMedicine();
}

export const deleteMedicineById = async (id) => {
  await api.delete(`/admin/medicine/delete/${id}`);
  await getListAllMedicine();
}

export const getReport = async()=>{
  return await api.post('/reporte')
}