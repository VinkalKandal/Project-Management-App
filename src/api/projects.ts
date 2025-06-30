import axios  from "../api/axios";

export interface Project {
    id: number;
    name: string
    year: number
    color: string
    pantone_value: string
}

export interface ProjectApiResponse{
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Project[]
}

export const getProjects = async(page: number): Promise<ProjectApiResponse>=>{
    // simulate mock API
    const response = await axios.get<ProjectApiResponse>(`/projects?page=${page}`); //replace with real API later
    return response.data
}