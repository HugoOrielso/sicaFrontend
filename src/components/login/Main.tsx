import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginRequest } from "@/services/AuthService"
import { toast } from "sonner"
const formSchema = z.object({
    email: z.string().email({
        message: "Ingresa un email válido.",
    }),
    password: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres.",
    }),
})

type FormData = z.infer<typeof formSchema>

const Main = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: FormData) => {
        try {
            const request = await loginRequest(data.email, data.password);

            localStorage.setItem("accessToken", request.accessToken);

            toast.success("Login exitoso")
            if (request.user.rol === "administrador") {
                setTimeout(() => {
                    location.href = "/administracion"
                }, 2000)
            }
            if (request.user.rol === "docente") {
                setTimeout(() => {
                    location.href = "/docentes"
                }, 2000)
            }
        } catch (error: unknown) {
            toast.error("Un error ocurrió intenta de nuevo")

            console.error("Error al iniciar sesión:", error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-8 shadow bg-white rounded-lg max-w-[500px] w-full mx-auto my-10">
                <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="ejemplo@email.com" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="******" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="bg-[#E7000B] w-full hover:bg-[#e7000cd7] cursor-pointer" type="submit">Iniciar sesión</Button>
            </form>
        </Form>
    )
}

export default Main
