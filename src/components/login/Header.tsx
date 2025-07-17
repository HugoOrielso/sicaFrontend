const Header = () => {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white text-red-600 p-2 rounded-lg font-bold text-xl">SICA</div>
                            <span className="text-lg font-semibold">Sistema de Control de Asistencia</span>
                        </div>
                    </div>
                    <nav className="hidden md:flex space-x-8">

                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header