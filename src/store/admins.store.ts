import api from '@/axios/axios';
import { create } from 'zustand';

interface CursoData {
  nombre: string;
  horario: string;
  fecha_inicio: string;
  fecha_fin: string;
  docente_id: string;
}

interface EstudianteData {
  nombre: string;
  email?: string;
  curso_id: string;
}

interface AdminState {
  loading: boolean;
  error: string | null;
  createCurso: (data: CursoData) => Promise<void>;
  registrarEstudiante: (data: EstudianteData) => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

export const useAdminStore = create<AdminState>((set) => ({
  loading: false,
  error: null,

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
}));
