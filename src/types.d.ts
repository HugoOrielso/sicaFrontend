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
