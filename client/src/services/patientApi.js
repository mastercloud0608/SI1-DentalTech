import api, { convertToJSONString } from './Api';

export const updateProfileById = async ({ username, password, nombre, apellido, ci, telefono, correo, direccion, id }) => {
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



/**
 * !Patient
 *    !Quote
 */


export const createQuote = async (fecha_cita) => {
    const obj = {
        fecha_cita: fecha_cita,
    }
    await api.post('/patient/create/quote', convertToJSONString(obj));
}

export const getServices = async () => {
    const { data } = await api.get('/odontologist/services');
    return data;
}



