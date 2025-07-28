// services/guardarAsistencia.ts
import api from '@/axios/axios';
import type { PayloadGuardarAsistencia } from '@/types';
import { toast } from 'sonner';

export async function guardarAsistencia(
  payload: PayloadGuardarAsistencia
): Promise<void> {
  try {
    await api.post('/docentes/guardarAsistencia', payload);
    toast.success('Asistencia guardada correctamente');
    setTimeout(()=>{
      location.reload()
    },2000)
  } catch (error) {
    toast.error('Error al guardar asistencia');
    throw error;
  }
}
