
import api from "@/axios/axios";

interface LoginResponse {
    status: string
    message: string
    accessToken: string
    user: {
        id: string,
        name: string,
        email: string,
        rol: string
    }
}

export const loginRequest = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
        "/users/login",
        { email, password }
    );
    return response.data;
};
