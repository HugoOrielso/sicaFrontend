
const Footer = () => {
    return (
        <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <div className="w-6 h-6 bg-red-600 rounded"></div>
                        <span className="text-lg font-semibold text-gray-900">FESC</span>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-sm text-gray-600">
                            © 2024 Fundación de Estudios Superiores Comfanorte. Todos los derechos reservados.
                        </p>
                        <div className="flex justify-center md:justify-end space-x-4 mt-2">
                            <a href="#" className="text-sm text-gray-500 hover:text-red-600">
                                Términos de Servicio
                            </a>
                            <a href="#" className="text-sm text-gray-500 hover:text-red-600">
                                Política de Privacidad
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer