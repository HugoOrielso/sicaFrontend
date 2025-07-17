import { ArrowRight, Badge } from "lucide-react"
import { Button } from "../ui/button"

const Hero = () => {
    return (
        <section id="inicio" className="relative bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <Badge className="bg-red-500 text-white mb-4">Nuevo Sistema 2025</Badge>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Control de Asistencia
                            <span className="block text-red-200">Inteligente</span>
                        </h1>
                        <p className="text-xl mb-8 text-red-100">
                            Gestiona la asistencia de tus estudiantes de manera eficiente con nuestro sistema automatizado. Reportes
                            en tiempo real, notificaciones automáticas y análisis detallados.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                                Prueba Gratuita
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-red-600 bg-transparent"
                            >
                                Ver Demo
                            </Button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-white p-6 rounded-2xl shadow-2xl">
                            <img className="rounded-lg object-cover max-w-[500px]" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ScHHp7XYbNnf6I7fGsAvWRNMLuI5f9.png" alt="portada fesc" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero