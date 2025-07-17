// src/layouts/DocenteLayout.tsx
import api from "@/axios/axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const DocenteLayout = () => {
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAccess = async () => {
            try {
                await api.get("/docentes/auth", {headers: {Authorization: localStorage.getItem("accessToken")}});
                setAuthorized(true);
            } catch {
                setAuthorized(false);
            }
        };

        checkAccess();
    }, []);

    if (authorized === null) return <div className="text-center p-10">Verificando acceso...</div>;

    if (!authorized) return <Navigate to="/login" replace />;

    return <Outlet />;
};

export default DocenteLayout;
