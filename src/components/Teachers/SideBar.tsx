import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { BarChart3, BookOpen, Calendar, ChevronDown, LogOut, User, Users } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import api from '@/axios/axios'

const SideBar = () => {
    const userName = localStorage.getItem("userName")
    async function closeSession() {
        const request = await api.post('/users/logout')
        if(request.data.status === 'ok') {
            localStorage.removeItem("userName")
            localStorage.removeItem("token")
            window.location.href = "/login"
        }
    }
    return (
        <SidebarProvider>
            <SidebarTrigger />
            <Sidebar className="border-r border-red-100">
                <SidebarHeader className="border-b border-red-100 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-red-900">FESC</h2>
                            <p className="text-sm text-red-600">Panel Docente</p>
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-red-800">Navegación</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton isActive className="data-[active=true]:bg-red-50 data-[active=true]:text-red-700">
                                        <a href="/docentes" className='flex items-center gap-2  w-full'>
                                            <BarChart3 className="w-4 h-4" />
                                            <span>Dashboard</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="hover:bg-red-50 hover:text-red-700">
                                        <a href="/docentes/cursos" className='flex items-center gap-2  w-full'>
                                            <Users className="w-4 h-4" />
                                            <span>Mis Cursos</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="hover:bg-red-50 hover:text-red-700">
                                        <a href="/docentes/asistencia" className='flex items-center gap-2  w-full'>
                                            <Calendar className="w-4 h-4" />
                                            <span>Asistencia</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="border-t border-red-100 p-4">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton className="hover:bg-red-50">
                                        <User className="w-4 h-4" />
                                        <div className="flex flex-col items-start">
                                            <span className="text-sm font-medium">Prof. {userName}</span>
                                            <span className="text-xs text-muted-foreground">Docente</span>
                                        </div>
                                        <ChevronDown className="ml-auto w-4 h-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={()=>{closeSession()}}>
                                        <LogOut   className="w-4 h-4 mr-2" />
                                        Cerrar Sesión
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </SidebarProvider>
    )
}

export default SideBar