import Layout from "@/components/Teachers/Layout"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useDocenteStore } from "@/store/teachers.store"
import { Calendar, CheckCircle, Clock, Mail, Users } from "lucide-react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const Course = () => {
    const { fetchCourseWithStudentsbyTeacherAndId, specificCourse } = useDocenteStore()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            fetchCourseWithStudentsbyTeacherAndId(id)
        }
    }, [fetchCourseWithStudentsbyTeacherAndId, id])

    if (!specificCourse) return <Layout><p className="p-4">Cargando curso...</p></Layout>

    return (
        <Layout>
            <div className="p-4 space-y-6">
                <Card className="border-0 shadow-lg bg-gradient-to-r from-red-600 to-red-700 text-white h-full">
                    <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl font-bold mb-2">
                                    {specificCourse.curso_nombre}
                                </CardTitle>
                                <div className="flex items-center space-x-6 text-blue-100">
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4" />
                                        <span>Horario: {specificCourse.horario}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(specificCourse.fecha_inicio).toLocaleDateString()} - {new Date(specificCourse.fecha_fin).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                Activo
                            </Badge>
                        </div>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 h-full gap-6">
                    {/* Students Section */}
                    <Card className="lg:col-span-2 shadow-lg border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Users className="w-5 h-5 text-red-600" />
                                <span>Estudiantes</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                                    {specificCourse.estudiantes?.length && specificCourse.estudiantes.map((est) => {
                                        return (
                                            <div className="flex items-center space-x-3 justify-between w-full" key={est.estudiante_id}>
                                                <div >

                                                    <div>
                                                        <p className="font-medium text-slate-900">{est.nombre}</p>
                                                        <div className="flex items-center space-x-1 text-sm text-slate-600">
                                                            <Mail className="w-3 h-3" />
                                                            <span>{est.email}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                {est.tipo_asistencia || 'Sin asistencia'}
                                                {
                                                    est.tipo_asistencia === 'asistencia' ? (
                                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                                    ) : est.tipo_asistencia === 'inasistencia' ? (
                                                        <Clock className="w-5 h-5 text-red-600" />
                                                    ) : (
                                                        <Clock className="w-5 h-5 text-yellow-600" />
                                                    )
                                                }
                                                </Badge>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-0">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span>Asistencia de Hoy</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-sm font-medium">Asistencia</span>
                                    </div>
                                    <span className="text-2xl font-bold text-green-600"> {specificCourse.asistencia_hoy.asistencia} </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="text-sm font-medium">Inasistencia</span>
                                    </div>
                                    <span className="text-2xl font-bold text-red-600">{specificCourse.asistencia_hoy.inasistencia}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        <span className="text-sm font-medium">Retrasos</span>
                                    </div>
                                    <span className="text-2xl font-bold text-orange-600">{specificCourse.asistencia_hoy.retraso}</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Asistencia Total</span>
                                    <span className="font-medium">{specificCourse.asistencia_hoy.asistencia}</span>
                                </div>
                                <Progress value={specificCourse.asistencia_hoy.asistencia * 100} className="h-2" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Inasistencia Total</span>
                                    <span className="font-medium">{specificCourse.asistencia_hoy.inasistencia}</span>
                                </div>
                                <Progress value={specificCourse.asistencia_hoy.inasistencia * 100} className="h-2" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Retraso Total</span>
                                    <span className="font-medium">{specificCourse.asistencia_hoy.retraso}</span>
                                </div>
                                <Progress value={specificCourse.asistencia_hoy.retraso * 100} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    )
}

export default Course
