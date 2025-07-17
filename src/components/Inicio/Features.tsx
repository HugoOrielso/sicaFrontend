import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { BarChart3, Calendar, CheckCircle, Shield, Users } from 'lucide-react'

const Features = () => {
    return (
        <section id="caracteristicas" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Características Principales</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Todo lo que necesitas para gestionar la asistencia estudiantil de manera profesional
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card className="border-l-4 border-l-red-600 hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <Users className="h-12 w-12 text-red-600 mb-4" />
                            <CardTitle className="text-gray-900">Gestión de Estudiantes</CardTitle>
                            <CardDescription>
                                Administra perfiles completos de estudiantes con información académica y personal
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-l-4 border-l-red-600 hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <Calendar className="h-12 w-12 text-red-600 mb-4" />
                            <CardTitle className="text-gray-900">Control de Horarios</CardTitle>
                            <CardDescription>Configura horarios de clases y controla la asistencia automáticamente</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-l-4 border-l-red-600 hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <BarChart3 className="h-12 w-12 text-red-600 mb-4" />
                            <CardTitle className="text-gray-900">Reportes Detallados</CardTitle>
                            <CardDescription>Genera reportes completos de asistencia con gráficos y estadísticas</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-l-4 border-l-red-600 hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <Shield className="h-12 w-12 text-red-600 mb-4" />
                            <CardTitle className="text-gray-900">Seguridad Avanzada</CardTitle>
                            <CardDescription>Protección de datos con encriptación y control de acceso por roles</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-l-4 border-l-red-600 hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CheckCircle className="h-12 w-12 text-red-600 mb-4" />
                            <CardTitle className="text-gray-900">Fácil de Usar</CardTitle>
                            <CardDescription>Interfaz intuitiva que no requiere capacitación técnica especializada</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Features