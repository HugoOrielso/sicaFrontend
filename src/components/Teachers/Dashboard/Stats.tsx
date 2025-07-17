import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDocenteStore } from '@/store/teachers.store'
import { AlertTriangle, BookOpen, CheckCircle, UserCheck, Users, UserX } from 'lucide-react'

const Stats = () => {

    const { cantidadDeCursos, totalStudents, statsAssistance } = useDocenteStore()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Cursos</CardTitle>
                    <BookOpen className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{cantidadDeCursos}</div>
                    <p className="text-xs text-muted-foreground">Cursos activos</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
                    <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold"> {totalStudents} </div>
                    <p className="text-xs text-muted-foreground">Estudiantes matriculados</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Asistencia Promedio</CardTitle>
                    <UserCheck className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold"> {statsAssistance.asistencia} %</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Inasistencia Global</CardTitle>
                    <UserX className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statsAssistance.inasistencia}%</div>
                    <p className="text-xs text-muted-foreground">
                        {statsAssistance.inasistencia < 20 ? (
                            <span className="text-green-600">
                                <CheckCircle className="inline w-3 h-3 mr-1" />
                                Nivel aceptable
                            </span>
                        ) : (
                            <span className="text-red-600">
                                <AlertTriangle className="inline w-3 h-3 mr-1" />
                                Requiere atención
                            </span>
                        )}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Stats