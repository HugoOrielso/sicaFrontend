import { GraficoPastelAsistencia } from '@/components/Grafico'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDocenteStore } from '@/store/teachers.store'
import { BookOpen, Users } from 'lucide-react'

const StatsTeacher = () => {

    const { cantidadDeCursos, totalStudents, statsAssistance } = useDocenteStore()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card>
                <GraficoPastelAsistencia data={statsAssistance} />
            </Card>
            <Card className='flex w-full flex-col items-center justify-between bg-gradient-to-br from-red-50 to-red-100/15 border-red-200'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 w-full pb-2">
                    <CardTitle className="text-sm font-medium">Total Cursos</CardTitle>
                    <BookOpen className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent className='mb-10'>
                    <div className="text-5xl font-bold">{cantidadDeCursos}</div>
                    <p className="text-xl text-muted-foreground">Cursos activos</p>
                </CardContent>
            </Card>

            <Card className='flex w-full flex-col items-center justify-between bg-gradient-to-br from-red-50 to-red-100/15 border-red-200'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 w-full pb-2">
                    <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
                    <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent className='mb-10'>
                    <div className="text-5xl font-bold"> {totalStudents} </div>
                    <p className="text-xl text-muted-foreground">Estudiantes matriculados</p>
                </CardContent>
            </Card>


        </div>
    )
}

export default StatsTeacher