import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById, Project } from "../api/projects";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (id) {
          const data = await getProjectById(id);
          setProject(data);
        }
      } catch (err) {
        console.error("Failed to fetch project details", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading project...</p>;
  if (!project) return <p className="text-center mt-10">Project not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
      <p className="text-gray-600 mb-4">{project.pantone_value}</p>
      <div className="w-full h-4 rounded" style={{ backgroundColor: project.color }} />
    </div>
  );
};

export default ProjectDetails;
