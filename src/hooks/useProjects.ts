import { useEffect, useRef, useState } from "react"
import { getProjects, type Project, type ProjectApiResponse} from "../api/projects"

export const useProjects = (page: number) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const cache = useRef<Map<number, Project[]>>(new Map()); // Memory cache
    useEffect(()=>{
        const fetch = async()=>{
            setLoading(true)

            if(cache.current.has(page)){
                setProjects(cache.current.get(page)!)
                setLoading(false)
                return;
            }

            try {
                const response = await getProjects(page);
                cache.current.set(page, response.data);
                setProjects(response.data)
                setTotalPages(response.total_pages)
            } catch (error) {
                console.log("Failed to fetch projects", error)
            }finally {
                setLoading(false);
            }
        }
        fetch()
    },[page])

    return{projects, loading, totalPages}
}