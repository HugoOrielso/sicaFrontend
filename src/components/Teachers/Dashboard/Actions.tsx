import api from '@/axios/axios'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAdminStore } from '@/store/admins.store'
import { GraduationCap, Plus, Users } from 'lucide-react'
import React, { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
const mockData = {
    courses: [
        { id: 1, name: "Matemáticas Básicas", code: "MAT101", students: 25, teacher: "Prof. García" },
        { id: 2, name: "Física General", code: "FIS201", students: 18, teacher: "Prof. Rodríguez" },
        { id: 3, name: "Química Orgánica", code: "QUI301", students: 22, teacher: "Prof. López" },
    ],
    students: [
        { id: 1, name: "Ana Martínez", email: "ana@email.com", code: "EST001" },
        { id: 2, name: "Carlos Pérez", email: "carlos@email.com", code: "EST002" },
        { id: 3, name: "María González", email: "maria@email.com", code: "EST003" },
    ],
    teachers: [
        { id: 1, name: "Prof. García", email: "garcia@fesc.edu", department: "Matemáticas" },
        { id: 2, name: "Prof. Rodríguez", email: "rodriguez@fesc.edu", department: "Física" },
        { id: 3, name: "Prof. López", email: "lopez@fesc.edu", department: "Química" },
    ],
    attendance: {
        totalStudents: 65,
        presentToday: 52,
        absentToday: 13,
        averageAttendance: 85,
        weeklyTrend: [78, 82, 85, 80, 88, 85, 90],
    },
}

const Actions = () => {
    const { teachers, allCoursesWithStudents } = useAdminStore()
    const [teacherSearch, setTeacherSearch] = useState("")
    const [showTeacherDropdown, setShowTeacherDropdown] = useState(false)
    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.nombre.toLowerCase().includes(teacherSearch.toLowerCase())
    )
    const [students, setStudents] = useState(mockData.students)
    const [newCourse, setNewCourse] = useState({
        name: "",
        horario: "",
        fecha_inicio: "",
        fecha_fin: "",
        teacherId: "",
    })

    const [newStudent, setNewStudent] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    })

    const [enrollment, setEnrollment] = useState({
        studentId: "",
        courseId: "",
    })

    const [assignment, setAssignment] = useState({
        teacherId: "",
        courseId: "",
    })

    const handleCreateCourse = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data); // Aquí puedes hacer la petición POST por ejemplo

        const request = await api.post('/admin/crearCurso', {
            nombre: data.courseName,
            horario: data.courseSchedule,
            fecha_inicio: data.startDate,
            fecha_fin: data.endDate,
            docente_id: data.teacherId,
        })

        console.log(request.data);
        if(request.data.status === 'ok') {
            setNewCourse({
                name: "",
                horario: "",
                fecha_inicio: "",
                fecha_fin: "",
                teacherId: "",
            })
            setTeacherSearch("")
            setShowTeacherDropdown(false)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            toast.success('Curso creado exitosamente')
        }else{
            toast.error(request.data.message || 'Error al crear el curso')
        }


    }

    const handleRegisterStudent = (e: React.FormEvent) => {
        e.preventDefault()
        const student = {
            id: students.length + 1,
            name: newStudent.name,
            email: newStudent.email,
            code: `EST${String(students.length + 1).padStart(3, "0")}`,
        }
        setStudents([...students, student])
        setNewStudent({ name: "", email: "", phone: "", address: "" })
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 min-h-[400px]">
            <Card>
                <CardHeader>
                    <CardTitle>Acciones Rápidas</CardTitle>
                    <CardDescription>Gestiona cursos, estudiantes y asignaciones</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full bg-transparent" variant="outline">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Crear Curso
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Crear Nuevo Curso</DialogTitle>
                                    <DialogDescription>Completa la información para crear un nuevo curso</DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleCreateCourse} className="space-y-4">
                                    <div>
                                        <Label htmlFor="courseName">Nombre del Curso</Label>
                                        <Input
                                            id="courseName"
                                            placeholder="Ej: Matemáticas Avanzadas"
                                            required
                                            name='courseName'
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="courseSchedule">Horario</Label>
                                        <Input
                                            id="courseSchedule"
                                            placeholder="Ej: Lunes y Miércoles 8:00-10:00 AM"
                                            required
                                            name='courseSchedule'
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="startDate">Fecha de Inicio</Label>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            required
                                            name='startDate'
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="endDate">Fecha de Fin</Label>
                                        <Input
                                            id="endDate"
                                            type="date"
                                            required
                                            name='endDate'
                                        />
                                    </div>
                                    <div className="relative">
                                        <Label htmlFor="courseTeacher">Profesor Asignado</Label>
                                        <Input
                                            id="courseTeacher"
                                            name='courseTeacher'
                                            value={teacherSearch}
                                            onChange={(e) => {
                                                setTeacherSearch(e.target.value)
                                                setShowTeacherDropdown(true)
                                            }}
                                            onFocus={() => setShowTeacherDropdown(true)}
                                            placeholder="Buscar profesor por nombre o departamento..."
                                            autoComplete="off"
                                        />
                                        {showTeacherDropdown && filteredTeachers.length > 0 && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                                {filteredTeachers.map((teacher) => (
                                                    <button
                                                        key={teacher.id}
                                                        type="button"
                                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                                        onClick={() => {
                                                            setNewCourse({ ...newCourse, teacherId: teacher.id.toString() })
                                                            setTeacherSearch(`${teacher.nombre}`)
                                                            setShowTeacherDropdown(false)
                                                        }}
                                                    >
                                                        <div className="font-medium">{teacher.nombre}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        {showTeacherDropdown && filteredTeachers.length === 0 && teacherSearch && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                                <div className="px-4 py-2 text-gray-500">No se encontraron profesores</div>
                                            </div>
                                        )}
                                    </div>
                                    <input type="hidden" name="teacherId" value={newCourse.teacherId || ''} />

                                    <Button type="submit" className="w-full">
                                        Crear Curso
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full bg-transparent" variant="outline">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Registrar Estudiante
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Registrar Nuevo Estudiante</DialogTitle>
                                    <DialogDescription>Completa la información del estudiante</DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleRegisterStudent} className="space-y-4">
                                    <div>
                                        <Label htmlFor="studentName">Nombre Completo</Label>
                                        <Input
                                            id="studentName"
                                            value={newStudent.name}
                                            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                            placeholder="Ej: Juan Pérez"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="studentEmail">Correo Electrónico</Label>
                                        <Input
                                            id="studentEmail"
                                            type="email"
                                            value={newStudent.email}
                                            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                                            placeholder="juan@email.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="studentPhone">Teléfono</Label>
                                        <Input
                                            id="studentPhone"
                                            value={newStudent.phone}
                                            onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                                            placeholder="Ej: +57 300 123 4567"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="studentAddress">Dirección</Label>
                                        <Input
                                            id="studentAddress"
                                            value={newStudent.address}
                                            onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                                            placeholder="Dirección completa"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Registrar Estudiante
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full bg-transparent" variant="outline">
                                    <Users className="w-4 h-4 mr-2" />
                                    Inscribir a Curso
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Inscribir Estudiante a Curso</DialogTitle>
                                    <DialogDescription>Selecciona el estudiante y el curso</DialogDescription>
                                </DialogHeader>
                                <form className="space-y-4">
                                    <div>
                                        <Label htmlFor="enrollStudent">Estudiante</Label>
                                        <Select
                                            value={enrollment.studentId}
                                            onValueChange={(value) => setEnrollment({ ...enrollment, studentId: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar estudiante" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {students.map((student) => (
                                                    <SelectItem key={student.id} value={student.id.toString()}>
                                                        {student.name} ({student.code})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="enrollCourse">Curso</Label>
                                        <Select
                                            value={enrollment.courseId}
                                            onValueChange={(value) => setEnrollment({ ...enrollment, courseId: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar curso" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {allCoursesWithStudents.map((course) => (
                                                    <SelectItem key={course.curso_id} value={course.curso_id.toString()}>
                                                        {course.curso_nombre} ({course.curso_id})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Inscribir Estudiante
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full bg-transparent" variant="outline">
                                    <GraduationCap className="w-4 h-4 mr-2" />
                                    Asignar Profesor
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Asignar Profesor a Curso</DialogTitle>
                                    <DialogDescription>Selecciona el profesor y el curso</DialogDescription>
                                </DialogHeader>
                                <form className="space-y-4">
                                    <div>
                                        <Label htmlFor="assignTeacher">Profesor</Label>
                                        <Select
                                            value={assignment.teacherId}
                                            onValueChange={(value) => setAssignment({ ...assignment, teacherId: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar profesor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {teachers.map((teacher) => (
                                                    <SelectItem key={teacher.id} value={teacher.id.toString()}>
                                                        {teacher.nombre}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="assignCourse">Curso</Label>
                                        <Select
                                            value={assignment.courseId}
                                            onValueChange={(value) => setAssignment({ ...assignment, courseId: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar curso" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {allCoursesWithStudents.map((course) => (
                                                    <SelectItem key={course.curso_id} value={course.curso_id}>
                                                        {course.curso_nombre} ({course.curso_id})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Asignar Profesor
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Cursos Recientes</CardTitle>
                    <CardDescription>Lista de cursos activos</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {allCoursesWithStudents.map((course) => (
                            <div key={course.curso_id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <p className="font-medium">{course.curso_nombre}</p>
                                    <p className="text-sm text-gray-500">
                                        {course.curso_id} • {course.docente_id}
                                    </p>
                                </div>
                                <Badge variant="secondary">{course.estudiantes.length} estudiantes</Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Actions