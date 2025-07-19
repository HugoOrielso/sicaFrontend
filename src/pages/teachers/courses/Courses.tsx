import Stats from '@/components/Teachers/Dashboard/StatsTeacher'
import Layout from '@/components/Teachers/Layout'
import { useDocenteStore } from '@/store/teachers.store'
import { useEffect } from 'react'

const Courses = () => {
    const { fetchCursos, fetchTotalStudents, fetchStatsAssistance, fetchStatsAssistanceByCourse, fetchCoursesWithStudentsbyTeacher, cousesWithStudentsByTeacer } = useDocenteStore()

    useEffect(() => {
        fetchCursos()
        fetchTotalStudents()
        fetchStatsAssistance()
        fetchStatsAssistanceByCourse()
        fetchCoursesWithStudentsbyTeacher()
    }, [fetchCursos, fetchTotalStudents, fetchStatsAssistance, fetchStatsAssistanceByCourse, fetchCoursesWithStudentsbyTeacher])
    return (
        <Layout>
            <div>
                <Stats />
            </div>

            <div className=" space-y-4 space-x-4">
                <h1 className="text-2xl font-bold">Mis cursos asignados</h1>

                {cousesWithStudentsByTeacer.length === 0 ? (
                    <p className="text-gray-600">No tienes cursos asignados por ahora.</p>
                ) : (
                    <ul className="grid grid-cols-2 gap-4 w-full">
                        {cousesWithStudentsByTeacer.map((curso) => (
                            <div key={curso.curso_id} className='flex w-full p-4 rounded-lg shadow-sm border items-center justify-between'>
                                <li key={curso.curso_id} className="flex flex-col items-start justify-center ">
                                    <h2 className="text-lg font-semibold">{curso.nombre_curso}</h2>
                                    <p className="text-sm text-muted-foreground">ID: {curso.curso_id}</p>
                                    <p className="text-sm">
                                        Estudiantes inscritos: <strong>{curso.estudiantes.length}</strong>
                                    </p>
                                </li>
                                <a href={`/docentes/cursos/${curso.curso_id}`} className='bg-red-500 cursor-pointer p-2 text-white rounded-lg hover:bg-red-600'>Ver curso</a>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                
            </div>
        </Layout>
    )
}

export default Courses