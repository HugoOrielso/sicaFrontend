import CoursesStadistics from '@/components/Teachers/Dashboard/CoursesStadistics'
import Stats from '@/components/Teachers/Dashboard/Stats'
import Layout from '@/components/Teachers/Layout'
import { useDocenteStore } from '@/store/teachers.store'
import { useEffect } from 'react'
const DashboardTeachers = () => {
  const {fetchCursos, fetchTotalStudents, fetchStatsAssistance, fetchStatsAssistanceByCourse } =  useDocenteStore()

  useEffect(()=>{
    fetchCursos()
    fetchTotalStudents()
    fetchStatsAssistance()
    fetchStatsAssistanceByCourse()
  },[fetchCursos, fetchTotalStudents,fetchStatsAssistance, fetchStatsAssistanceByCourse])

  return (
    <Layout>
      <div>
        <Stats/>
      </div>
      <div className='grid grid-cols-2 w-full '>
        <CoursesStadistics/>
      </div>
    </Layout>
  )
}

export default DashboardTeachers