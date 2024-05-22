import axios from 'axios';

import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
//import { getListAllMedicine } from '../../../server/controllers/Admin/admin.medicine.controller';

export const authContext = createContext();

export const useProvider = () => {
  const context = useContext(authContext);
  return context;
}

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);

  const baseURL = process.env.NODE_ENV === 'production' ? 'https://107.21.166.29/api' : 'http://192.168.1.5:3000/api';

  const api = axios.create({
    baseURL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const convertToJSONString = (obj) => {
    return JSON.stringify(obj);
  }

  /**
   * !user
   */
  const loginUser = async (username, password) => {
    const obj = {
      username: username,
      password: password
    }
    return api.post('/login', convertToJSONString(obj));
  }

  const registerUser = async ({ username, password, correo }) => {
    const obj = {
      username: username,
      password: password,
      correo: correo
    }
    return api.post('/register', convertToJSONString(obj));
  }

  const logout = () => {
    localStorage.removeItem("user");
  }

  const setUserContext = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  }

  const getUser = () => {
    const userJSON = localStorage.getItem("user");
    const user = JSON.parse(userJSON);
    return user;
  }

  //user
  const updateProfileById = async ({ username, password, nombre, apellido, ci, telefono, correo, direccion, id }) => {
    const obj = {
      username: username,
      password: password,
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      telefono: telefono,
      direccion: direccion,
      ci: ci,
      id: id
    }
    await api.put('/profile', convertToJSONString(obj));
    await getAllUsersAdmin();
  }

  const createUser = async (users, { rol }) => {
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


  const restorePassword = async ({ correo }) => {
    const obj = {
      correo: correo,
    }
    return await api.post('/restore/password', convertToJSONString(obj));
  }

  const changePassword = async ({ id, password, confirm_password }) => {
    const obj = {
      id: id,
      password: password,
      confirm_password: confirm_password,
    }
    return await api.put('/restore/password/change', convertToJSONString(obj));
  }

  /**
   * !Admin
   *      !dashboard
   */

  const [timeline, setTimeLine] = useState([]);
  const [loadingTimeLine, setLoadingTimeLine] = useState(true);
  const getTimeLine = async () => {
    const { data } = await api.get('/admin/timeline');
    setTimeLine(data);
    setLoadingTimeLine(false);
  }

  const [usercount, setUsercount] = useState([]);
  const [loadingUserCount, setLoadingUserCount] = useState(true);
  const getUserCountDay = async () => {
    const { data } = await api.get('/admin/top_services');
    setUsercount(data);
    setLoadingUserCount(false);
  }

  /**
   * !Admin
   *      !users
   */

  const [users, setUsersList] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const getAllUsersAdmin = async () => {
    const { data } = await api.get('/admin/users');
    setUsersList(data);
    setLoadingUsers(false);
  }

  const [specialisms, setSpecialismsList] = useState([]);
  const [loadingSpecialisms, setLoadingSpecialisms] = useState(true);
  const getAllOdontologistSpecialisms = async () => {
    const { data } = await api.get('/odontologist/specialisms');
    setSpecialismsList(data);
    setLoadingSpecialisms(false);
  }

  const [loadingUserId, setLoadinUserId] = useState(true);
  const getUserById = async (id) => {
    const { data } = await api.get(`/admin/user/${id}`);
    setLoadinUserId(false);
    return data;
  }

  const deleteUserById = async (id) => {
    await api.delete(`/admin/user/delete/${id}`);
    await getAllUsersAdmin();
    await getTimeLine();
    await getListAllDiarysOdontologists();
  }

  //admin
  const updateUser = async ({ id, username, nombre, apellido, correo, telefono, direccion, ci, rol, password }) => {
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
  const [supplies, setSuppliesList] = useState([]);
  const [loadingSupplies, setLoadingSupplies] = useState(true);
  const getListAllSupplies = async () => {
    const { data } = await api.get('/admin/supplies');
    setSuppliesList(data);
    setLoadingSupplies(false);
  }

  const [loadingSuppliesId, setLoadinSuppliesId] = useState(true);
  const getSupplieById = async (id) => {
    const { data } = await api.get(`/admin/supplie/${id}`);
    setLoadinSuppliesId(false);
    return data;
  }

  const deleteSupplieById = async (id) => {
    await api.delete(`/admin/supplie/delete/${id}`);
    await getListAllSupplies();
  }

  const updateSupplie = async ({ id, nombre, cantidad, descripcion }) => {
    const obj = {
      id: id,
      nombre: nombre,
      cantidad: cantidad,
      descripcion: descripcion,
    }
    await api.put('/admin/supplie/update', convertToJSONString(obj));
    await getListAllSupplies();
  }

  const createSupplie = async ({ nombre, cantidad, descripcion }) => {
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
  const [diarysOdontologist, setDiarysOdontologist] = useState([]);
  const [loadingDiarysOdontologist, setLoadingsetDiarysOdontologist] = useState(true);
  const getListAllDiarysOdontologists = async () => {
    const { data } = await api.get('/admin/diarys/odontologist');
    setDiarysOdontologist(data);
    setLoadingsetDiarysOdontologist(false);
  }

  // --nuevo
  const [loadingDiaryOdontologistId, setLoadingsetDiaryOdontologistId] = useState(true);
  const getDiaryOdontologistIdEspecialism = async (id) => {
    const { data } = await api.get(`/diary/odontologist/${id}`);
    setLoadingsetDiaryOdontologistId(false);
    return data;
  }

  // :id


  /**
   * !Patient
   *    !Quote
   */


  const createQuote = async (fecha_cita) => {
    const obj = {
      fecha_cita: fecha_cita,
    }
    await api.post('/patient/create/quote', convertToJSONString(obj));
  }

  const [services, setServicesList] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const getServices = async () => {
    const { data } = await api.get('/odontologist/services');
    setServicesList(data);
    setLoadingServices(false);
  }


  /**Tratamientos
   * 
   */
  const [treatments, setTreatmentList] = useState([]);
  const [loadingTreatment, setLoadingTreatment] = useState(true);
  const getListTreatments = async () => {
    const { data } = await api.get('/admin/treatments');
    setTreatmentList(data);
    setLoadingTreatment(false);
  }


  const getTreatment = () => {
    const userJSON = localStorage.getItem("treatment");
    const treatment = JSON.parse(userJSON);
    return treatment;
  }

  const createTreatment = async ({ nombre, costo, descripcion, duracion }) => {
    const obj = {
      nombre: nombre,
      costo: costo,
      descripcion: descripcion,
      duracion: duracion
    }
    await api.post('/admin/treatment/create', convertToJSONString(obj));
    await getListTreatments();
  }

  const [loadingTreatmentId, setLoadinTreatmentId] = useState(true);
  const getTreatmentById = async (id) => {
    const { data } = await api.get(`/admin/treatment/${id}`);
    setLoadinTreatmentId(false);
    return data;
  }




  const updateTreatment = async ({ id, nombre, costo, descripcion, duracion }) => {
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

  const deleteTreatmentById = async (id) => {
    await api.delete(`/admin/treatment/delete/${id}`);
    await getListTreatments();
  }



  /**Medicamentos (Medicine)
   * 
   */
  const [medicine, setMedicineList] = useState([]);
  const [loadingMedicine, setLoadingMedicine] = useState(true);
  const getListAllMedicine = async () => {
    const { data } = await api.get('/admin/medicines');
    setMedicineList(data);
    setLoadingMedicine(false);
  }


  const getMedicine = () => {
    const userJSON = localStorage.getItem("medicine");
    const medicine = JSON.parse(userJSON);
    return medicine;
  }

  const createMedicine = async ({ nombre, descripcion }) => {
    const obj = {
      nombre: nombre,
      descripcion: descripcion
    }
    await api.post('/admin/medicine/create', convertToJSONString(obj));
    await getListAllMedicine();
  }

  const [loadingMedicineId, setLoadinMedicineId] = useState(true);
  const getMedicineById = async (id) => {
    const { data } = await api.get(`/admin/medicine/${id}`);
    setLoadinMedicineId(false);
    return data;
  }

  const updateMedicine = async ({ id, nombre, descripcion }) => {
    const obj = {
      id: id,
      nombre: nombre,
      descripcion: descripcion,
    }
    await api.put('/admin/medicine/update', convertToJSONString(obj));
    await getListAllMedicine();
  }

  const deleteMedicineById = async (id) => {
    await api.delete(`/admin/medicine/delete/${id}`);
    await getListAllMedicine();
  }




  /**
   * Odontologo
   */
  const [patients, setpatientsList] = useState();
  const [loadingPatients, setLoadingPatients] = useState(true);
  const getAllPatientsOdontologist = async () => {
    const { data } = await api.get('/odontologist/patients');
    setpatientsList(data);
    setLoadingPatients(false);
  }



  useEffect(() => {
    if (getUser()) {
      setLoading(false);
      getAllUsersAdmin();
      getListAllSupplies();
      // getTimeLine();
      getServices();
      // getListAllQuotesOdontologist();
      getListTreatments();
      getTreatment();

      getListAllMedicine();
      getMedicine();

      getAllPatientsOdontologist();
      // getUserCountDay();

    } else {
      setLoading(true);
    }
  }, []);

  return (
    <authContext.Provider
      value={{
        loginUser,
        registerUser,
        updateProfileById,
        loading,
        setUserContext,
        getUser,
        users,
        logout,
        loadingUsers,
        setUsersList,
        loadingUserId,
        getUserById,
        deleteUserById,
        updateUser,
        supplies,
        loadingSupplies,
        loadingSuppliesId,
        getSupplieById,
        deleteSupplieById,
        updateSupplie,
        createSupplie,
        restorePassword,
        changePassword,
        timeline,
        loadingTimeLine,
        createQuote,
        services,
        loadingServices,

        treatments,
        loadingTreatment,
        createTreatment,
        getTreatmentById,
        loadingTreatmentId,
        updateTreatment,
        deleteTreatmentById,

        medicine,
        loadingMedicine,
        createMedicine,
        getMedicineById,
        updateMedicine,
        loadingMedicineId,
        deleteMedicineById,


        patients,
        loadingPatients,

        createUser,

        loadingUserCount,
        usercount,

        getTimeLine,
        setTimeLine,

        setUsercount,
        getUserCountDay,

        specialisms,
        loadingSpecialisms,
        getAllOdontologistSpecialisms,

        diarysOdontologist,
        loadingDiarysOdontologist,
        getListAllDiarysOdontologists,
        setDiarysOdontologist,

      }}
    >
      {children}
    </authContext.Provider>
  )
}
