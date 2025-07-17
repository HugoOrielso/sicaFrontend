import Footer from "@/components/Inicio/Footer"
import Header from "@/components/login/Header"
import Main from "@/components/login/Main"

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default LoginPage