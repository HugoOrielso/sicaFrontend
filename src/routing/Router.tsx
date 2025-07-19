import AdminLayout from '@/Auth/AuthAdmin'
import DocenteLayout from '@/Auth/AuthDocentes'
import DashboardAdmin from '@/pages/admin/dashboard/DashboardAdmin'

import InicioPage from '@/pages/Inicio/InicioPage'
import LoginPage from '@/pages/Login/LoginPage'
import Assistance from '@/pages/teachers/assitance/Assistance'
import Course from '@/pages/teachers/course/Course'
import Courses from '@/pages/teachers/courses/Courses'
import DashboardTeachers from '@/pages/teachers/dashboard/DashboardTeachers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<InicioPage />} path='/' />
        <Route element={<LoginPage />} path='/login' />

        <Route element={<DocenteLayout />}>
          <Route path="/docentes" element={<DashboardTeachers />} />
          <Route path="/docentes/asistencia" element={<Assistance />} />
          <Route path="/docentes/cursos" element={<Courses />} />
          <Route path="/docentes/cursos/:id" element={<Course />} />
        </Route>

        {/* Rutas para ADMIN */}
        <Route element={<AdminLayout />}>
          <Route path="/administracion" element={<DashboardAdmin />} />
          <Route path="/administracion/curso/:id" element={<DashboardAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router