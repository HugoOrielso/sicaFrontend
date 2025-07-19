import api from '@/axios/axios';
import type { CursoConEstudiantes, Docente, History, ResumenGlobal, Student } from '@/types';
import { create } from 'zustand';

interface CursoData {
  curso_id: string;
  curso_nombre: string;
  estudiantes: EstudianteData[];
  fecha_inicio: string;
  fecha_fin: string;
  horario: string;
  docente_id: string;
}

interface EstudianteData {
  nombre: string;
  email: string;
  estudiante_id: string;
  curso_nombre: number
  porcentaje_inasistencia: number;
  porcentaje_retraso: number;
}

interface AdminState {
  loading: boolean;
  error: string | null;
  allCourses: CursoConEstudiantes[];
  cantidadEstudiantes: number;
  teachers: Docente[];
  students: Student[];
  history: History[];
  resumenGlobal: ResumenGlobal
  allCoursesWithStudents: CursoConEstudiantes[];
  createCurso: (data: CursoData) => Promise<void>;
  registrarEstudiante: (data: EstudianteData) => Promise<void>;
  checkAuth: () => Promise<boolean>;
  fetchAllCourses: () => Promise<void>;
  fetchAllCoursesWithStudents: () => Promise<void>;
  fetchAllTeachers: () => Promise<void>;
  fetchAllStudents: () => Promise<void>;
  fetchHistory: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
  loading: false,
  error: null,
  allCourses: [],
  cantidadEstudiantes: 0,
  students: [],
  history: [],
  resumenGlobal: {
    total_cursos: 0,
    total_registros: 0,
    porcentaje_asistencia_global: 0,
    porcentaje_inasistencia_global: 0,
    porcentaje_retraso_global: 0,
  },
  teachers: [],
  allCoursesWithStudents: [],
  createCurso: async (data) => {
    set({ loading: true, error: null });
    try {
      await api.post('/admin/crearCurso', data);
      set({ loading: false });
    } catch (error: unknown) {
      const errorMessage = typeof error === 'object' && error !== null && 'message' in error
        ? (error as { message?: string }).message
        : undefined;
      set({ error: errorMessage || 'Error al crear curso', loading: false });
    }
  },
  registrarEstudiante: async (data) => {
    set({ loading: true, error: null });
    try {
      await api.post('/admin/registrarEstudiante', data);
      set({ loading: false });
    } catch (error: unknown) {
      const errorMessage = typeof error === 'object' && error !== null && 'message' in error
        ? (error as { message?: string }).message
        : undefined;
      set({ error: errorMessage || 'Error al registrar estudiante', loading: false });
    }
  },
  checkAuth: async () => {
    set({ loading: true, error: null });
    try {
      await api.get('/admin/auth');
      set({ loading: false });
      return true;
    } catch {
      set({ loading: false });
      return false;
    }
  },
  fetchAllCourses: async () => {
    set({ loading: true, error: null });
    try {
      const request = await api.get('/admin/allCourses');
      if (request.status === 204) {
        set({ allCourses: [], loading: false });
        return;
      }
      set({ allCourses: request.data.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  fetchAllCoursesWithStudents: async () => {
    set({ loading: true, error: null });
    try {
      const request = await api.get('/admin/allCoursesWithStudents');
      if (request.status === 204) {
        set({ allCoursesWithStudents: [], loading: false });
        return;
      }

      set({ allCoursesWithStudents: request.data.data, resumenGlobal: request.data.resumen, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  fetchAllTeachers: async () => {
    set({ loading: true, error: null });
    try {
      const request = await api.get('/admin/allTeachers');
      if (request.status === 204) {
        set({ teachers: [], loading: false });
        return;
      }
      set({ teachers: request.data.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  fetchAllStudents: async () => {
    set({ loading: true, error: null });
    try {
      const request = await api.get('/admin/allStudents');
      const req = await api.get('/admin/totalStudents');

      if (req.status === 200) {
        set({ cantidadEstudiantes: req.data.total, loading: false });
      } else {
        set({ cantidadEstudiantes: 0, loading: false });
      }

      if (request.status === 204) {
        set({ students: [], loading: false });
        return;
      }
      set({ students: request.data.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },
  fetchHistory: async () => {
    set({ loading: true, error: null });
    try {
      const request = await api.get('/users/history');

      if (request.status === 204) {
        set({ history: [], loading: false });
        return;
      }
      set({ history: request.data.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },
}));
