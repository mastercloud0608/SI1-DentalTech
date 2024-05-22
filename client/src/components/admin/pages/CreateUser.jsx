import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../services/adminApi';
import { getAllOdontologistSpecialisms } from '../../../services/odontologistApi';
import { useQuery } from 'react-query';

export const CreateUser = () => {

    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ['specialisms'],
        queryFn: getAllOdontologistSpecialisms
    });

    const [selectedEspecialidadesCount, setSelectedEspecialidadesCount] = useState([]);
    const [enableButton, setEnableButton] = useState(false);
    const [showInputs, setShowInputs] = useState(false);
    const [isOpenArray, setIsOpenArray] = useState([]);
    const [rol, setRole] = useState({ rol: '' })
    const [error, setError] = useState('')
    const [user, setUser] = useState([{
        username: '',
        password: '',
        correo: '',
        selectedEspecialidad: [],
        selectedEspecialidadId: []
    }]);

    const handleChange = (e, index) => {
        const { name, value, type, checked } = e.target;
        const newUsers = [...user];

        if (type === 'checkbox') {
            if (checked) {
                if (!newUsers[index].selectedEspecialidad.includes(value)) {
                    newUsers[index].selectedEspecialidad.push(value);
                    newUsers[index].selectedEspecialidadId.push(parseInt(e.target.dataset.id)); // Almacena el ID
                }
            } else {
                newUsers[index].selectedEspecialidad = newUsers[index].selectedEspecialidad.filter((item) => item !== value);
                newUsers[index].selectedEspecialidadId = newUsers[index].selectedEspecialidadId.filter((id) => id !== parseInt(e.target.dataset.id));
            }
            const updatedCount = [...selectedEspecialidadesCount];
            updatedCount[index] = newUsers[index].selectedEspecialidad.length;
            setSelectedEspecialidadesCount(updatedCount);
        } else {
            newUsers[index][name] = value;
        }

        setUser(newUsers);
    };

    const handleShowInputs = () => {
        setShowInputs(true);
    }

    const toggleDropdown = (index) => {
        const newIsOpenArray = [...isOpenArray];
        newIsOpenArray[index] = !newIsOpenArray[index];
        setIsOpenArray(newIsOpenArray);
    };

    const handleChangeRole = ({ target: { name, value } }) => {
        setRole({ [name]: value })
        if (value !== '') setEnableButton(true);
    }

    const handleAddUser = () => {
        setUser([...user,
        {
            username: '',
            password: '',
            correo: '',
            selectedEspecialidad: [],
            selectedEspecialidadId: []
        }
        ]);
    }

    const handleRemoveUser = (index) => {
        const newUsers = [...user];
        newUsers.splice(index, 1);
        setUser(newUsers);

        const newSelectedCount = [...selectedEspecialidadesCount];
        newSelectedCount.splice(index, 1);
        setSelectedEspecialidadesCount(newSelectedCount);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const option = e.nativeEvent.submitter.id;

        if (option === 'cancel') {
            navigate('/admin/users');
            return;
        }

        if (rol.rol !== 'odontologist') {
            if (!showInputs || user.some(u => !u.username || !u.password || !u.correo)) {
                console.log('Porfavor llena los campos')
                setError('Porfavor llena los campos');
                return;
            }
        } else {
            if (!showInputs || user.some(u => !u.username || !u.password || !u.correo || !u.selectedEspecialidadId.length)) {
                console.log('Porfavor llena los campos')
                setError('Porfavor llena los campos');
                return;
            }
        }


        try {
            await createUser(user, rol);
            setUser([
                {
                    username: '',
                    password: '',
                    correo: '',
                    selectedEspecialidad: [],
                    selectedEspecialidadId: []
                },
            ]);
            navigate('/admin/users');
        } catch (e) {
            console.log(e)
            setError(e);
        }
    }


    return (
        <>
            <div className="w-full p-6 mx-auto">
                <div className="flex flex-wrap -mx-3">
                    <form onSubmit={handleSubmit} className="w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-0">
                        <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
                            <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                                <div className="flex items-center">
                                    <p className="mb-0 uppercase">Crear usuario o usuarios</p>
                                </div>
                            </div>

                            <div className="flex-auto p-6">
                                <div className="flex flex-wrap -mx-3">

                                    <div className="w-full max-w-full px-3 shrink-0 md:flex-0">
                                        <div className="mb-4">
                                            <label className="inline-block mb-2 ml-1 text-xp text-slate-700 ">Seleccione el rol para el o los usuarios:</label>
                                            <select
                                                name='rol'
                                                onChange={handleChangeRole}
                                                className=" text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                            >
                                                <option value="" selected disabled defaultValue >Seleccione una opcion</option>
                                                <option value='admin'>Administrador</option>
                                                <option value='odontologist'>Odontologo</option>
                                                <option value='patient'>Paciente</option>
                                            </select>
                                        </div>
                                        {
                                            showInputs && user.length > 0 &&
                                            <hr className="my-1 border-gray-300" />
                                        }
                                    </div>

                                    {
                                        showInputs &&
                                        user.map((userSinlge, index) => (
                                            <React.Fragment key={index}>
                                                <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                                                    <div className="mb-4">
                                                        <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700">Nombre de usuario</label>
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            onChange={e => handleChange(e, index)}
                                                            value={userSinlge.username}
                                                            className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                                                    </div>
                                                </div>
                                                <div className="w-full max-w-full px-3 shrink-0 md:w-4/12  md:flex-0">
                                                    <div className="mb-4">
                                                        <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700">Contraseña</label>
                                                        <div className='flex justify-center items-center'>
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                onChange={e => handleChange(e, index)}
                                                                value={userSinlge.password}
                                                                className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full max-w-full px-3 shrink-0 md:w-4/12 md:flex-0">
                                                    <div className="mb-4">
                                                        <label className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 ">Correo</label>
                                                        <input
                                                            type="text"
                                                            name="correo"
                                                            onChange={e => handleChange(e, index)}
                                                            value={userSinlge.correo}
                                                            className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none" />
                                                    </div>
                                                </div>

                                                {
                                                    rol.rol === 'odontologist' &&
                                                    <div className="w-full max-w-full px-3 shrink-0  md:w-full md:flex-0">
                                                        <div className="mb-4">
                                                            <div>
                                                                <label className="inline-block mb-2 ml-1 text-xp text-slate-700 "> Seleccione la especialidad(es) del odontologo:</label>

                                                                <button
                                                                    className="text-start text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                                                                    type="button"
                                                                    onClick={() => toggleDropdown(index)}
                                                                >
                                                                    Seleccione su especialidad(es)
                                                                </button>
                                                                {isOpenArray[index] && (
                                                                    <div className=" text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none">
                                                                        <ul className="p-3 space-y-3 text-sm text-gray-700">
                                                                            {
                                                                                isLoading ?
                                                                                    <p>cargando . . . </p>
                                                                                    :
                                                                                    data.map(({ id, nombre }) => (
                                                                                        <li key={id}>
                                                                                            <div className="flex items-start">
                                                                                                <input
                                                                                                    type="checkbox"
                                                                                                    value={nombre}
                                                                                                    onChange={(e) => handleChange(e, index)}
                                                                                                    data-id={id}
                                                                                                    checked={user[index].selectedEspecialidad.includes(nombre)}
                                                                                                />
                                                                                                <label className="ml-2 text-sm font-medium text-gray-900 ">{nombre}</label>
                                                                                            </div>
                                                                                        </li>
                                                                                    ))
                                                                            }

                                                                        </ul>
                                                                    </div>
                                                                )}
                                                                {selectedEspecialidadesCount[index] > 0 && (
                                                                    <div className="mt-2 text-sm text-gray-600">
                                                                        Especialidades seleccionadas: {selectedEspecialidadesCount[index]}
                                                                    </div>
                                                                )}
                                                                <div className='py-3'>
                                                                    <button
                                                                        className="inline-block border w-full px-4 py-2 text-base font-semibold text-white bg-red-500 rounded-lg shadow-md"
                                                                        type="button"
                                                                        onClick={() => handleRemoveUser(index)}
                                                                    >
                                                                        Eliminar
                                                                    </button>
                                                                </div>
                                                                <hr className="my-1 border-gray-300" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    rol.rol !== 'odontologist' &&
                                                    <div className='py-1 w-full ml-3 mr-3'>
                                                        <button
                                                            className="inline-block border w-full px-4 py-2 text-base font-semibold text-white bg-red-500 rounded-lg shadow-md"
                                                            type="button"
                                                            onClick={() => handleRemoveUser(index)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                        <hr className="my-2 border-gray-300" />
                                                    </div>
                                                }

                                            </React.Fragment>
                                        ))
                                    }


                                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                        <div className="mb-4">
                                            <button
                                                className="inline-block border w-full px-4 py-2 text-base font-semibold text-white bg-custom-blue rounded-lg shadow-md"
                                                type={`${showInputs ? 'button' : 'submit'}`}
                                                id='cancel'
                                                onClick={handleAddUser}
                                            >
                                                {showInputs ? 'Agregar  registro' : 'Cancelar'}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                        <div className="mb-4">
                                            <button
                                                className={`inline-block border w-full cursor-not-allowed  px-4 py-2 text-base font-semibold text-black ${enableButton
                                                    ? 'bg-custom-rose cursor-pointer'
                                                    : 'bg-red-100'} rounded-lg shadow-md"
                                                `}
                                                type={`${showInputs ? 'submit' : 'button'}`}
                                                id="save"
                                                disabled={!enableButton}
                                                onClick={handleShowInputs}
                                            >
                                                {showInputs ? 'Guardar usuarios' : 'Siguiente'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}