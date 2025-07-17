import { Button } from '../ui/button'

const Header = () => {
    return (
        <header className="bg-red-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        <div className="bg-white text-red-600 p-2 rounded-lg font-bold text-xl">SICA</div>
                        <span className="text-lg font-semibold">Sistema de Control de Asistencia</span>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <a href="#inicio" className="hover:text-red-200 transition-colors">
                            Inicio
                        </a>
                        <a href="#caracteristicas" className="hover:text-red-200 transition-colors">
                            Características
                        </a>
                        <a href="#precios" className="hover:text-red-200 transition-colors">
                            Precios
                        </a>
                        <a href="#contacto" className="hover:text-red-200 transition-colors">
                            Contacto
                        </a>
                    </nav>
                    <Button onClick={() => { window.location.href = "/login"; }} variant="secondary" className="bg-white text-red-600 hover:bg-red-50 cursor-pointer">
                        Iniciar Sesión
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header