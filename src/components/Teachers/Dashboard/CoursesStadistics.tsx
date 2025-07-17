import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useDocenteStore } from '@/store/teachers.store'

const CoursesStadistics = () => {
    const { statsByCurso } = useDocenteStore()

    return (
        <div className="        ">
            <Card>
                <CardHeader>
                    <CardTitle>Resumen de Cursos</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {statsByCurso.map((course, index) => {
                            const asistencia = course.estadisticas.find(e => e.tipo === 'asistencia')?.porcentaje ?? 0;
                            return (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg w-full">
                                    <div className="flex-1">
                                        <div className="font-medium">{course.nombre_curso}</div>
                                        <div className="text-sm text-gray-500">
                                            5 estudiantes
                                        </div>
                                        <div className="mt-2">
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span>Asistencia</span>
                                                <span>{asistencia}%</span>
                                            </div>
                                            <Progress value={asistencia} className="h-2" />
                                        </div>
                                    </div>
                                    <Badge
                                        variant={
                                            asistencia >= 85 ? "default" : asistencia >= 70 ? "secondary" : "destructive"
                                        }
                                        className="ml-4"
                                    >
                                        {asistencia >= 85 ? "Excelente" : asistencia >= 70 ? "Buena" : "Baja"}
                                    </Badge>
                                </div>
                            );
                        })}

                    </div>
                </CardContent>
            </Card>

            
        </div>
    )
}

export default CoursesStadistics