import CoursesStadistics from '@/components/Teachers/Dashboard/CoursesStadistics'
import StatsTeacher from '@/components/Teachers/Dashboard/StatsTeacher'
import Layout from '@/components/Teachers/Layout'
import { useDocenteStore } from '@/store/teachers.store'
import { useEffect } from 'react'
const DashboardTeachers = () => {
  const {fetchCursos, fetchTotalStudents, fetchStatsAssistance, fetchStatsAssistanceByCourse, fetchHistory } =  useDocenteStore()

  useEffect(()=>{
    fetchCursos()
    fetchTotalStudents()
    fetchStatsAssistance()
    fetchStatsAssistanceByCourse()
    fetchHistory()
  },[fetchCursos, fetchTotalStudents,fetchStatsAssistance, fetchStatsAssistanceByCourse, fetchHistory])

  return (
    <Layout>
      <div>
        <StatsTeacher/>
      </div>
      <div className='w-full '>
        <CoursesStadistics/>
      </div>
    </Layout>
  )
}

export default DashboardTeachers