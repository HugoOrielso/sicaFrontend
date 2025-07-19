import Layout from '@/components/admin/Layout'
import StatsAdmin from '@/components/admin/StatsAdmin'
import Actions from '@/components/Teachers/Dashboard/Actions'

import { useAdminStore } from '@/store/admins.store'
import { useEffect } from 'react'
const DashboardAdmin = () => {
  const {fetchAllCourses, fetchAllCoursesWithStudents, fetchAllTeachers, fetchAllStudents, fetchHistory } = useAdminStore()
  useEffect(()=>{
      fetchAllCourses()
      fetchAllCoursesWithStudents()
      fetchAllTeachers()
      fetchAllStudents()
      fetchHistory()
  },[fetchAllCourses, fetchAllCoursesWithStudents, fetchAllTeachers, fetchAllStudents, fetchHistory])

  return (
    <Layout>
      <div>
        <StatsAdmin/>
      </div>
      <div>
        <Actions/>
      </div>

    </Layout>
  )
}

export default DashboardAdmin