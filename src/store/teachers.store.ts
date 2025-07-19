// src/store/useDocenteStore.ts
import api from '@/axios/axios'
import type { Course, CursoConEstudiantes, CursoStats, History, SpecificCourse } from '@/types'
import { create } from 'zustand'


interface DocenteState {
    cursos: Course[]
    cantidadDeCursos: number
    totalStudents: number
    loading: boolean
    history: History[]
    error: string | null
    statsAssistance: { asistencia: number, inasistencia: number, retraso: number }
    statsByCurso: CursoStats[]
    cousesWithStudentsByTeacer: CursoConEstudiantes[]
    specificCourse: SpecificCourse | null
    fetchCursos: () => Promise<void>
    fetchTotalStudents: () => Promise<void>
    fetchStatsAssistance: () => Promise<void>
    fetchStatsAssistanceByCourse: () => Promise<void>
    fetchCoursesWithStudentsbyTeacher: () => Promise<void>
    fetchCourseWithStudentsbyTeacherAndId: (id: string) => Promise<void>
    fetchHistory: () => Promise<void>
}

export const useDocenteStore = create<DocenteState>((set) => ({
    cursos: [],
    cantidadDeCursos: 0,
    totalStudents: 0,
    loading: false,
    error: null,
    history: [],
    statsAssistance: { asistencia: 0, inasistencia: 0, retraso: 0 },
    statsByCurso: [],
    cousesWithStudentsByTeacer: [],
    specificCourse: null,
    fetchCursos: async () => {
        set({ loading: true, error: null });
        try {
            const res = await api.get('/docentes/cursos');
            set({ cursos: res.data.cursos, cantidadDeCursos: res.data.cursos.length, loading: false });
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : 'Error al cargar cursos';
            set({ error: errorMsg, loading: false });
        }
    },
    fetchTotalStudents: async () => {
        set({ loading: true, error: null });
        try {
            const res = await api.get('/docentes/totalStudenst');
            set({ totalStudents: res.data.total[0].cantidad_estudiantes, loading: false });
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : 'Error al cargar estudiantes';
            set({ error: errorMsg, loading: false });
        }
    },
    fetchStatsAssistance: async () => {
        set({ loading: true, error: null });
        try {
            const res = await api.get('/docentes/statsAssistance');
            if (res.status === 204) {
                set({ statsAssistance: { asistencia: 0, inasistencia: 0, retraso: 0 }, loading: false });
                return;
            }

            const stats = res.data.estadisticas.reduce(
                (acc: { [key: string]: number }, item: { tipo: string; porcentaje: number }) => {
                    acc[item.tipo] = item.porcentaje;
                    return acc;
                },
                { asistencia: 0, inasistencia: 0, retraso: 0 }
            );

            set({ statsAssistance: stats, loading: false });

        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : 'Error al cargar asistencia';
            set({ error: errorMsg, loading: false });
        }
    },

    fetchStatsAssistanceByCourse: async () => {
        set({ loading: true, error: null });
        try {
            const res = await api.get('/docentes/statsAssistanceByCourse');

            if (res.status === 204 || !res.data?.estadisticas) {
                set({ statsByCurso: [], loading: false });
                return;
            }

            set({ statsByCurso: res.data.estadisticas, loading: false });

        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : 'Error al cargar asistencia por curso';
            set({ error: errorMsg, loading: false });
        }
    },
    fetchCoursesWithStudentsbyTeacher: async () => {
        set({ loading: true, error: null });
        try {
            const res = await api.get('/docentes/cursosConEstudiantes');

            if (res.status === 204 || !res.data?.cursos) {
                set({ cousesWithStudentsByTeacer: [], loading: false });
                return;
            }

            set({ cousesWithStudentsByTeacer: res.data.cursos, loading: false });

        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : 'Error al cargar asistencia por curso';
            set({ error: errorMsg, loading: false });
        }
    },
    fetchCourseWithStudentsbyTeacherAndId: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const res = await api.get('/docentes/curso/' + id);

            if (res.status === 204 || !res.data?.curso) {
                set({ specificCourse: null, loading: false });
                return;
            }

            console.log(res.data.curso);

            set({ specificCourse: res.data.curso, loading: false });
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : 'Error al cargar asistencia por curso';
            set({ error: errorMsg, loading: false });
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
