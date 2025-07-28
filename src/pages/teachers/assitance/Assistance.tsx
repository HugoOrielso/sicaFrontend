import Layout from "@/components/Teachers/Layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Clock, Save, Users, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useDocenteStore } from "@/store/teachers.store";
import Stats from "@/components/Teachers/Dashboard/StatsTeacher";
import { guardarAsistencia } from "@/services/asistencias";
import type { EstadoAsistencia } from "@/types";

const Assistance = () => {
    const {
        fetchCursos,
        fetchTotalStudents,
        fetchStatsAssistance,
        fetchStatsAssistanceByCourse,
        fetchCoursesWithStudentsbyTeacher,
        cousesWithStudentsByTeacer
    } = useDocenteStore();

    const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);
    type AsistenciaTipo = "asistencia" | "inasistencia" | "retraso";
    const [attendance, setAttendance] = useState<Record<string, AsistenciaTipo>>({});
    const [justificaciones, setJustificaciones] = useState<Record<string, string>>({});

    const selectedCourse = cousesWithStudentsByTeacer.find(
        (c) => c.curso_id === selectedCourseId
    );
    const students = selectedCourse?.estudiantes || [];

    // ✅ INICIALIZAR attendance según asistencia_hoy
    useEffect(() => {
        const initial: Record<string, AsistenciaTipo> = {};
        students.forEach((s) => {
            if (s.asistencia_hoy === "asistencia") initial[s.estudiante_id] = "asistencia";
            else if (s.asistencia_hoy === "inasistencia") initial[s.estudiante_id] = "inasistencia";
            else if (s.asistencia_hoy === "retraso") initial[s.estudiante_id] = "retraso";
        });
        setAttendance(initial);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCourseId]);

    useEffect(() => {
        fetchCoursesWithStudentsbyTeacher();
        fetchCursos();
        fetchTotalStudents();
        fetchStatsAssistance();
        fetchStatsAssistanceByCourse();
    }, [fetchCoursesWithStudentsbyTeacher, fetchCursos, fetchStatsAssistance, fetchStatsAssistanceByCourse, fetchTotalStudents]);


    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    };

    const handleGuardarAsistencia = async () => {
        if (!selectedCourseId) return;

        const registros = Object.entries(attendance).map(([estudiante_id, rawEstado]) => {
            let estado: EstadoAsistencia;

            if (rawEstado === "asistencia") estado = "presente";
            else if (rawEstado === "inasistencia") estado = "ausente";
            else estado = "tardanza";

            const studentInfo = students.find(s => s.estudiante_id === estudiante_id);
            const rawMotivo = justificaciones[estudiante_id] ?? studentInfo?.motivo_justificacion ?? "";
            const motivo = rawMotivo.trim();

            const justificada = (estado === "ausente" && motivo ? 1 : 0) as 0 | 1;

            return {
                estudiante_id,
                estado,
                justificada,
                motivo_justificacion: justificada ? motivo : null,
                curso_id: selectedCourseId,
                fecha: new Date().toISOString().split("T")[0],
            };



        });


        await guardarAsistencia({
            curso_id: selectedCourseId,
            registros,
        });
    };

    const presentCount = Object.values(attendance).filter((v) => v === "asistencia").length;
    const absentCount = Object.values(attendance).filter((v) => v === "inasistencia").length;
    const lateCount = Object.values(attendance).filter((v) => v === "retraso").length;

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
                                            <TableHead>Justificación</TableHead>
                                            <TableHead>Observaciones</TableHead>

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
                                                        {student.asistencia_hoy || "Sin datos"}
                                                    </Badge>
                                                </TableCell>

                                                <TableCell className="text-center">
                                                    <Checkbox
                                                        checked={attendance[student.estudiante_id] === "asistencia"}
                                                        onCheckedChange={() =>
                                                            setAttendance((prev) => ({
                                                                ...prev,
                                                                [student.estudiante_id]: "asistencia"
                                                            }))
                                                        }
                                                    />
                                                </TableCell>

                                                <TableCell className="text-center">
                                                    <Checkbox
                                                        checked={attendance[student.estudiante_id] === "inasistencia"}
                                                        onCheckedChange={() =>
                                                            setAttendance((prev) => ({
                                                                ...prev,
                                                                [student.estudiante_id]: "inasistencia"
                                                            }))
                                                        }
                                                    />
                                                </TableCell>

                                                <TableCell className="text-center">
                                                    <Checkbox
                                                        checked={attendance[student.estudiante_id] === "retraso"}
                                                        onCheckedChange={() =>
                                                            setAttendance((prev) => ({
                                                                ...prev,
                                                                [student.estudiante_id]: "retraso"
                                                            }))
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {attendance[student.estudiante_id] === "inasistencia" ? (
                                                        <input
                                                            type="text"
                                                            className="w-full text-sm px-2 py-1 border rounded"
                                                            placeholder="Motivo de la justificación"
                                                            value={
                                                                justificaciones[student.estudiante_id] ??
                                                                student.motivo_justificacion ??
                                                                ""
                                                            }
                                                            onChange={(e) =>
                                                                setJustificaciones((prev) => ({
                                                                    ...prev,
                                                                    [student.estudiante_id]: e.target.value,
                                                                }))
                                                            }
                                                        />
                                                    ) : student.motivo_justificacion ? (
                                                        <span className="text-muted-foreground text-sm italic">
                                                            {student.motivo_justificacion}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground text-sm italic">—</span>
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    {student.motivo_justificacion
                                                        ? <span className="text-sm italic text-muted-foreground">{student.motivo_justificacion}</span>
                                                        : "—"}
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
                                        <span className="text-sm">Ausentes: {absentCount}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-yellow-600" />
                                        <span className="text-sm">Tardanzas: {lateCount}</span>
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
    );
};

export default Assistance;
