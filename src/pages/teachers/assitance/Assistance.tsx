import Layout from "@/components/Teachers/Layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Clock, Save, Users, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { useDocenteStore } from "@/store/teachers.store"
import Stats from "@/components/Teachers/Dashboard/Stats"
import { guardarAsistencia } from "@/services/asistencias"

const Assistance = () => {
    const { fetchCursos, fetchTotalStudents, fetchStatsAssistance, fetchStatsAssistanceByCourse, fetchCoursesWithStudentsbyTeacher, cousesWithStudentsByTeacer } = useDocenteStore()
    const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined)
    const [attendance, setAttendance] = useState<Record<string, boolean>>({});

    const handleGuardarAsistencia = async () => {
        if (!selectedCourseId) return;

        const registros = Object.entries(attendance).map(([estudiante_id, valor]) => {
            let estado: 'presente' | 'ausente' | 'tardanza';

            if (valor === true) estado = 'presente';
            else if (valor === false) estado = 'ausente';
            else estado = 'tardanza';

            return { estudiante_id, estado };
        });

        await guardarAsistencia({
            curso_id: selectedCourseId,
            registros,
        });
    };

    useEffect(() => {
        fetchCoursesWithStudentsbyTeacher()
        fetchCursos()
        fetchTotalStudents()
        fetchStatsAssistance()
        fetchStatsAssistanceByCourse()
    }, [fetchCursos, fetchTotalStudents, fetchStatsAssistance, fetchStatsAssistanceByCourse, fetchCoursesWithStudentsbyTeacher])

    const selectedCourse = cousesWithStudentsByTeacer.find(
        (c) => c.curso_id === selectedCourseId
    );

    const students = selectedCourse?.estudiantes || [];

    const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setAttendance((prev: any) => ({
            ...prev,
            [studentId]: isPresent,
        }))
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()
    }

    const presentCount = Object.values(attendance).filter(Boolean).length
    return (
        <Layout>
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Control de Asistencia</h1>
                            <p className="text-gray-600">Registra la asistencia de estudiantes por curso</p>
                        </div>
                    </div>
                </div>
                <Stats />
                <Card>
                    <CardHeader>
                        <CardTitle>Seleccionar Curso</CardTitle>
                        <CardDescription>Elige el curso para registrar la asistencia</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un curso" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cousesWithStudentsByTeacer.map((course) => (
                                            <SelectItem key={course.curso_id} value={course.curso_id}>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{course.nombre_curso}</span>
                                                    <Badge variant="outline">{course.curso_id}</Badge>
                                                    <span className="text-sm text-muted-foreground">({course.nombre_curso})</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Fecha:{" "}
                                {new Date().toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {selectedCourseId && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-red-600" />
                                Lista de Asistencia
                            </CardTitle>
                            <CardDescription>Marca la asistencia de cada estudiante</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Estudiante</TableHead>
                                            <TableHead>ID Estudiante</TableHead>
                                            <TableHead>Tasa de Asistencia</TableHead>
                                            <TableHead className="text-center">Presente</TableHead>
                                            <TableHead className="text-center">Ausente</TableHead>
                                            <TableHead className="text-center">Tardanza</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {students.map((student) => (
                                            <TableRow key={student.estudiante_id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarImage src={`/placeholder-user.jpg`} />
                                                            <AvatarFallback className="bg-red-100 text-red-700">
                                                                {getInitials(student.nombre)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="font-medium">{student.nombre}</div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <Badge variant="outline">{student.estudiante_id}</Badge>
                                                </TableCell>

                                                <TableCell>
                                                    <Badge variant="outline" className="bg-gray-200 text-gray-600">
                                                        Sin datos
                                                    </Badge>
                                                </TableCell>

                                                <TableCell className="text-center">
                                                    <Checkbox
                                                        checked={attendance[student.estudiante_id] === true}
                                                        onCheckedChange={() => handleAttendanceChange(student.estudiante_id, true)}
                                                    />
                                                </TableCell>

                                                <TableCell className="text-center">
                                                    <Checkbox
                                                        checked={attendance[student.estudiante_id] === false}
                                                        onCheckedChange={() => handleAttendanceChange(student.estudiante_id, false)}
                                                    />
                                                </TableCell>

                                                <TableCell className="text-center">
                                                    <Checkbox
                                                        checked={attendance[student.estudiante_id] === undefined}
                                                        onCheckedChange={() => {
                                                            setAttendance((prev) => {
                                                                const newAttendance = { ...prev }
                                                                delete newAttendance[student.estudiante_id]
                                                                return newAttendance
                                                            })
                                                        }}
                                                    />
                                                </TableCell>
                                            </TableRow>


                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex items-center justify-between mt-4 p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <span className="text-sm">Presentes: {presentCount}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <XCircle className="h-4 w-4 text-red-600" />
                                        <span className="text-sm">
                                            Ausentes: {Object.values(attendance).filter((a) => a === false).length}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-yellow-600" />
                                        <span className="text-sm">Tardanzas: {students.length - Object.keys(attendance).length}</span>
                                    </div>
                                </div>
                                <Button className="bg-red-600 hover:bg-red-700" onClick={handleGuardarAsistencia}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Guardar Asistencia
                                </Button>

                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Layout>
    )
}

export default Assistance