import AdminLayout from '@/Auth/AuthAdmin'
import DocenteLayout from '@/Auth/AuthDocentes'
import DashboardAdmin from '@/pages/admin/dashboard/DashboardAdmin'

import InicioPage from '@/pages/Inicio/InicioPage'
import LoginPage from '@/pages/Login/LoginPage'
import Assistance from '@/pages/teachers/assitance/Assistance'
import DashboardTeachers from '@/pages/teachers/dashboard/DashboardTeachers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<InicioPage />} path='/' />
        <Route element={<LoginPage />} path='/login' />

        {/* Rutas para DOCENTES */}
        <Route element={<DocenteLayout />}>
          <Route path="/docentes" element={<DashboardTeachers />} />
          <Route path="/docentes/asistencia" element={<Assistance />} />

        </Route>

        {/* Rutas para ADMIN */}
        <Route element={<AdminLayout />}>
          <Route path="/administracion" element={<DashboardAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router