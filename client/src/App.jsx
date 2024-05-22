import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';

import {
  HeaderNavigation,
  VerticalNavigation
} from './components/navigation';

import {
  LoginForm,
  RestorePassword,
  RegisterForm,
  ChangePassword,
  RootHome,
} from './components/home';

import {
  Dashboard,
  ListUsers,
  ListDiarys,
  ListSupplies,
  ListInvoice,
  EditUser,
  EditSupplie,
  CreateSupplie,
  CreateUser,

  ListTreatments,
  CreateTreatment,
  EditTreatment,

  ListMedicines,
  CreateMedicine,
  EditMedicine,
} from './components/admin';

import {
  ListPatients,
  ListPatientsQuotes,
  ListPatientsMedicaments,
  ListPatientsSupplies
} from './components/odontologist'

import {
  PerfilUser,
  PatientQuote,
  SelectService,
  SectionServices,
  InvoicePatient
} from './components/patient';

import { AccessNotAuthorized } from './components/utils';

import {
  ProtectedHome,
  ProtectedRoute,
  ProtectedRedirect
} from './router';


/**
 * 
 *  roles:
 *    
 *  !admin
 *       !odontogist
 *                 !patient
 */



export const App = () => {
  return (
    <>
        <AuthProvider>
          <Routes>

            <Route element={<ProtectedHome />}>
              <Route path='/' element={<HeaderNavigation />} >
                <Route path='/home' element={<RootHome />} />
                <Route path='/' element={<Navigate to='/home' />} />
              </Route>
              <Route path='/login' element={<LoginForm />} />
              <Route path='/register' element={<RegisterForm />} />
              <Route path='/restore/password' element={<RestorePassword />} />
              <Route path='/restore/password/change/:id' element={<ChangePassword />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<ProtectedRedirect redirectTo='/redirect' rol='admin' />}>
                <Route path='/admin' element={<VerticalNavigation />} >
                  <Route path='/admin/dashboard' element={<Dashboard />} />
                  <Route path='/admin/users' element={<ListUsers />} />
                  <Route path='/admin/diary' element={<ListDiarys />} />
                  <Route path='/admin/supplies' element={<ListSupplies />} />
                  <Route path='/admin/reports' element={<ListInvoice />} />
                  <Route path='/admin/users/createuser' element={<CreateUser />} />
                  <Route path='/admin/users/createsupplie' element={<CreateSupplie />} />
                  <Route path='/admin/users/edit/:id' element={<EditUser />} />
                  <Route path='/admin/supplies/edit/:id' element={<EditSupplie />} />
                  <Route path='/admin/' element={<Navigate to='/admin/dashboard' />} />
                  <Route path='/admin/treatments' element={<ListTreatments />} />
                  <Route path='/admin/treatment/createTreatment' element={<CreateTreatment />} />
                  <Route path='/admin/treatment/edit/:id' element={<EditTreatment />} />
                  <Route path='/admin/medicines' element={<ListMedicines />} />
                  <Route path='/admin/medicine/createMedicine' element={<CreateMedicine />} />
                  <Route path='/admin/medicine/edit/:id' element={<EditMedicine />} />
                </Route>
              </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<ProtectedRedirect redirectTo='/redirect' rol='odontologist' />}>
                <Route path='/odontologist' element={<VerticalNavigation />} >
                  <Route path='/odontologist/patients' element={<ListPatients />} />
                  <Route path='/odontologist/quotes' element={<ListPatientsQuotes />} />
                  <Route path='/odontologist/medicament' element={<ListPatientsMedicaments />} />
                  <Route path='/odontologist/supplies' element={<ListPatientsSupplies />} />
                  <Route path='/odontologist/' element={<Navigate to='/odontologist/patients' />} />
                </Route>
              </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<ProtectedRedirect redirectTo='/redirect' rol='patient' />}>
                <Route path='/patient' element={<VerticalNavigation />} >
                  <Route path='/patient/profile' element={<PerfilUser />} />
                  <Route path='/patient/quote' element={<SelectService />} />
                  <Route path='/patient/quote/calendar/:id' element={<PatientQuote />} />
                  <Route path='/patient/services' element={<SectionServices />} />
                  <Route path='/patient/invoice' element={<InvoicePatient />} />
                  <Route path='/patient/' element={<Navigate to='/patient/profile' />} />
                </Route>
              </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path='/redirect' element={<AccessNotAuthorized />} />
            </Route>

          </Routes>

        </AuthProvider>
    </>
  )
}
