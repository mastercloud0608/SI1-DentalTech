import api, { convertToJSONString } from './Api';

export const getAllPatientsOdontologist = async () => {
    const { data } = await api.get('/odontologist/patients');
    return data;
}

export const getAllOdontologistSpecialisms = async () => {
    const { data } = await api.get('/odontologist/specialisms');
    return data;
  }
  
