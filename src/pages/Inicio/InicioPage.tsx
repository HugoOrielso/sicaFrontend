import Features from '@/components/Inicio/Features'
import Footer from '@/components/Inicio/Footer'
import Header from '@/components/Inicio/Header'
import Hero from '@/components/Inicio/Hero'

const InicioPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header/>
            <Hero/>
            <Features/>
            <Footer/>
        </div>
    )
}

export default InicioPage