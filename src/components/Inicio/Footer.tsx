import { Mail, MapPin, Phone, Star } from 'lucide-react'

const Footer = () => {
    return (
        <footer id="contacto" className="bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-red-600 text-white p-2 rounded-lg font-bold text-xl">SICA</div>
                            <span className="font-semibold">Sistema de Control</span>
                        </div>
                        <p className="text-gray-400 mb-4">La solución más completa para el control de asistencia estudiantil</p>
                        <div className="flex space-x-4">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Producto</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Características
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Precios
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Integraciones
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    API
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Soporte</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Centro de Ayuda
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Documentación
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Tutoriales
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Contacto</h3>
                        <div className="space-y-3 text-gray-400">
                            <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                +57 607 5784878
                            </div>
                            <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2" />
                                info@sica.edu.co
                            </div>
                            <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                Cúcuta, Colombia
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 SICA - Sistema de Control de Asistencia. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer