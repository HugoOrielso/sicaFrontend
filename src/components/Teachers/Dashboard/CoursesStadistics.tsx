import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useDocenteStore } from '@/store/teachers.store'
import { Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'

const CoursesStadistics = () => {
    const { statsByCurso, fetchCoursesWithStudentsbyTeacher, cousesWithStudentsByTeacer, history } = useDocenteStore()
    useEffect(() => {
        fetchCoursesWithStudentsbyTeacher()
    }, [fetchCoursesWithStudentsbyTeacher])

    function getTotalStudents(courseId: string) {
        const course = cousesWithStudentsByTeacer.find(c => c.curso_id === courseId);
        return course ? course.estudiantes.length : 0;
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(history.length / itemsPerPage);
    const paginatedHistory = history.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    return (
        <div className="min-h-[600px] grid grid-cols-1  gap-4">
            <Card className="    h-full">
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
                                            Total Estudiantes: {getTotalStudents(course.curso_id)}
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

            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Historial de Acciones
                    </CardTitle>
                    <CardDescription>Registro de actividades recientes del sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2 px-3 font-medium text-gray-600">Usuario</th>
                                    <th className="text-left py-2 px-3 font-medium text-gray-600">Tipo</th>
                                    <th className="text-left py-2 px-3 font-medium text-gray-600">Descripción</th>
                                    <th className="text-left py-2 px-3 font-medium text-gray-600">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedHistory.map((action) => (
                                    <tr key={action.id} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-3">{action.id}</td>
                                        <td className="py-2 px-3">
                                            <Badge variant="secondary" className="bg-amber-100">
                                                {action.tipo}
                                            </Badge>
                                        </td>
                                        <td className="py-2 px-3">{action.descripcion}</td>
                                        <td className="py-2 px-3 text-gray-500">{action.fecha}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <div className="flex justify-end items-center gap-2 mt-4">
                                <button
                                    className="text-sm px-3 py-1 border rounded disabled:opacity-50"
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    Anterior
                                </button>
                                <span className="text-sm">
                                    Página {currentPage} de {totalPages}
                                </span>
                                <button
                                    className="text-sm px-3 py-1 border rounded disabled:opacity-50"
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    Siguiente
                                </button>
                            </div>

                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CoursesStadistics