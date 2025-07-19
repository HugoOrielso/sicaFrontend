interface Course {
  id: string
  nombre: string
  horario: string
  fecha_inicio: string
  fecha_fin: string
  docente_id: string
}

interface CursoStats {
  curso_id: string
  nombre_curso: string
  estadisticas: {
    tipo: string
    porcentaje: number
  }[]
}


export interface Estudiante {
  estudiante_id: string;
  nombre: string;
  email: string;
}

export interface CursoConEstudiantes {
  curso_id: string;
  nombre_curso: string;
  estudiantes: Estudiante[];
}


// types/asistencia.ts
export type EstadoAsistencia = 'presente' | 'ausente' | 'tardanza';

export interface RegistroAsistencia {
  estudiante_id: string;
  estado: EstadoAsistencia;
}

export interface PayloadGuardarAsistencia {
  curso_id: string;
  registros: RegistroAsistencia[];
}


export interface SpecificCourse {
  curso_id: string
  curso_nombre: string
  horario: string
  fecha_inicio: string
  fecha_fin: string
  estudiantes: {
    estudiante_id: string
    nombre: string
    email: string
    tipo_asistencia?: 'asistencia' | 'inasistencia' | 'retraso' | null
  }[]
  asistencia_hoy: {
    asistencia: number
    inasistencia: number
    retraso: number
  }
}


export interface EstudianteStats {
  estudiante_id: string;
  nombre: string;
  email: string;
  porcentaje_asistencia: number;
  porcentaje_inasistencia: number;
  porcentaje_retraso: number;
}

export interface CursoConEstudiantes {
  curso_id: string;
  curso_nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  horario: string;
  docente_id: string;
  estudiantes: EstudianteStats[];
  total_asistencias: number;
  total_inasistencias: number;
  total_retrasos: number;
  total_registros: number;
  porcentaje_asistencia: number;
  porcentaje_inasistencia: number;
  porcentaje_retraso: number;
  docente_nombre: string;
}

export interface ResumenGlobal {
  total_cursos: number;
  total_registros: number;
  porcentaje_asistencia_global: number;
  porcentaje_inasistencia_global: number;
  porcentaje_retraso_global: number;
}

export interface CursosConEstudiantesResponse {
  status: 'ok' | 'error';
  data: CursoConEstudiantes[];
  resumen: ResumenGlobal;
}


interface Docente {
  id: string;
  nombre: string;
  email: string;
  rol: string
}

interface Student {
  id: string;
  nombre: string;
  email: string;
}

interface History{
  id: string;
  usuario_id: string;
  tipo: string;
  fecha: string;
  descripcion: string;
}