import api from '@/axios/axios'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useAdminStore } from '@/store/admins.store'
import { Check, ChevronsUpDown, Plus, Users } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'

const Actions = () => {
    const { teachers, allCoursesWithStudents, students } = useAdminStore()
    const [teacherSearch, setTeacherSearch] = useState("")
    const [showTeacherDropdown, setShowTeacherDropdown] = useState(false)
    const [openStudent, setOpenStudent] = useState(false);

    const filteredTeachers = teachers.filter(
        (teacher) =>
            teacher.nombre.toLowerCase().includes(teacherSearch.toLowerCase())
    )
    const [newCourse, setNewCourse] = useState({
        name: "",
        horario: "",
        fecha_inicio: "",
        fecha_fin: "",
        teacherId: "",
    })

    const [enrollment, setEnrollment] = useState({
        studentId: "",
        courseId: "",
    })
    const selectedStudent = students.find((s) => s.id === enrollment.studentId);

    const handleCreateCourse = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const request = await api.post('/admin/crearCurso', {
            nombre: data.courseName,
            horario: data.courseSchedule,
            fecha_inicio: data.startDate,
            fecha_fin: data.endDate,
            docente_id: data.teacherId,
        })

        if (request.data.status === 'ok') {
            setTeacherSearch("")
            setShowTeacherDropdown(false)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            toast.success('Curso creado exitosamente')
        } else {
            toast.error(request.data.message || 'Error al crear el curso')
        }
    }
    const handleRegisterTeacher = async (e: FormEvent<HTMLFormElement>) => {


        try {
            e.preventDefault()
            const form = e.currentTarget;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const request = await api.post('/admin/saveTeacher', {
                name: data.name,
                email: data.email,
                password: data.password,
                rol: "docente",
            })

            if (request.data.status === 'ok') {
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
                toast.success('Profesor creado exitosamente')
            } else {
                toast.error(request.data.message || 'Error al crear el profesor')
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Error al registrar el profesor, por favor intente nuevamente');
        }

    }

    const handleRegisterStudent = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const form = e.currentTarget;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const request = await api.post('/admin/matricularEstudiante', {
                nombre: data.name,
                email: data.email,
            })
            if (request.data.status === 'ok') {
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
                toast.success('Profesor creado exitosamente')
            } else {
                toast.error(request.data.message || 'Error al crear el profesor')
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Error al registrar el estudiante, por favor intente nuevamente');
        }
    }

    const handleRegisterStudentToCourse = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { studentId, courseId } = enrollment;

        try {
            const response = await api.post('/admin/matricularEstudianteACurso', {
                estudiante_id: studentId,
                curso_id: courseId,
            });

            if (response.data.status === 'ok') {
                setOpenStudent(false);
                setEnrollment({ studentId: "", courseId: "" });
                toast.success('Estudiante inscrito al curso exitosamente');
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } else {
                toast.error(response.data.message || 'Error al inscribir estudiante al curso');
            }

        } catch (err) {
            console.error("Error:", err);
            toast.error("Error de red al inscribir estudiante");
        }
    };

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

                                    <Button type="submit" className="w-full cursor-pointer">
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
                                        <Label htmlFor="name">Nombre Completo</Label>
                                        <Input
                                            id="name"
                                            name='name'
                                            placeholder="Ej: Juan Pérez"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Correo Electrónico</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name='email'
                                            placeholder="juan@email.com"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full cursor-pointer">
                                        Registrar Estudiante
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>

                        <Dialog >
                            <DialogTrigger asChild>
                                <Button className="w-full bg-transparent" variant="outline">
                                    <Users className="w-4 h-4 mr-2" />
                                    Inscribir a Curso
                                </Button>
                            </DialogTrigger>
                            <DialogContent className='min-w-[700px]'>
                                <DialogHeader>
                                    <DialogTitle>Inscribir Estudiante a Curso</DialogTitle>
                                    <DialogDescription>Selecciona el estudiante y el curso</DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleRegisterStudentToCourse} className="space-y-4 ">
                                    <div>
                                        <Popover open={openStudent} onOpenChange={setOpenStudent}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className="w-full justify-between"
                                                >
                                                    {selectedStudent
                                                        ? `${selectedStudent.nombre} (${selectedStudent.email})`
                                                        : "Seleccionar estudiante"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput placeholder="Buscar estudiante..." />
                                                    <CommandList>
                                                        <CommandEmpty>No se encontró ningún estudiante</CommandEmpty>
                                                        {students.map((student) => (
                                                            <CommandItem
                                                                key={student.id}
                                                                value={`${student.nombre.toLowerCase()} ${student.email.toLowerCase()}`}
                                                                onSelect={() => {
                                                                    setEnrollment({ ...enrollment, studentId: student.id });
                                                                    setOpenStudent(false);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        student.id === enrollment.studentId ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {student.nombre} ({student.email})
                                                            </CommandItem>
                                                        ))}
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
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
                                    <Plus className="w-4 h-4 mr-2" />
                                    Crear Profesor
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Registrar Nuevo Profesor</DialogTitle>
                                    <DialogDescription>Completa la información del profesor</DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleRegisterTeacher} className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Nombre Completo</Label>
                                        <Input
                                            id="name"
                                            name='name'
                                            placeholder="Ej: Dr. Juan Pérez"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Correo Electrónico</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name='email'
                                            placeholder="juan.perez@fesc.edu"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="password">Contraseña</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name='password'
                                            placeholder="Contraseña temporal"
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full cursor-pointer">
                                        Registrar Profesor
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
                                <div className='items-start justify-start flex flex-col'>
                                    <p className="font-medium">{course.curso_nombre}</p>
                                    <p className="text-sm text-gray-500">
                                        {course.docente_nombre} • {course.horario}
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