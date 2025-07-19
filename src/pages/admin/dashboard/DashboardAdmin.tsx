import Layout from '@/components/admin/Layout'
import Actions from '@/components/Teachers/Dashboard/Actions'
import Stats from '@/components/Teachers/Dashboard/Stats'
import { useAdminStore } from '@/store/admins.store'
import { useEffect } from 'react'
const DashboardAdmin = () => {
  const {fetchAllCourses, fetchAllCoursesWithStudents, fetchAllTeachers} = useAdminStore()
  useEffect(()=>{
      fetchAllCourses()
      fetchAllCoursesWithStudents()
      fetchAllTeachers()
  },[fetchAllCourses, fetchAllCoursesWithStudents, fetchAllTeachers])

  return (
    <Layout>
      <div>
        <Stats/>
      </div>
      <div className='  '>
        <Actions/>
      </div>

    </Layout>
  )
}

export default DashboardAdmin