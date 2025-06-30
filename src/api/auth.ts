import axios from './axios';

interface AuthResponse {
    token: string;
}

export const loginUser = async (email: string, password: string) : Promise<AuthResponse> =>{
    const response = await axios.post("/login", { email:"eve.holt@reqres.in", password:'cityslicka' });
    return response.data;
}

export const registerUser = async (email: string, password: string): Promise<AuthResponse> =>{
    const response = await axios.post("/register", { email: "eve.holt@reqres.in", password:"pistol" });
    return response.data;
}