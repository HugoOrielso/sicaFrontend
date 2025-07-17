import Layout from '@/components/admin/Layout'
import Stats from '@/components/Teachers/Dashboard/Stats'
import { useDocenteStore } from '@/store/teachers.store'
import { useEffect } from 'react'
const DashboardAdmin = () => {
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
      </div>

    </Layout>
  )
}

export default DashboardAdmin